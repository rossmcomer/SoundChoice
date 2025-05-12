const {
  STRIPE_SECRET,
  STRIPE_WEBHOOK_SECRET,
  DEV_WEBHOOK_SECRET,
  DOMAIN_NAME,
} = require('../util/config');
const stripe = require('stripe')(STRIPE_SECRET);
const router = require('express').Router();
import { Request, Response } from 'express';
import { prisma } from '../util/db';
import { PRODUCTS } from '../assets/PRODUCTS';
import Stripe from 'stripe';
const { tokenExtractor } = require('../util/middleware');

router.post(
  '/pay-deposit',
  tokenExtractor,
  async (req: Request, res: Response) => {
    const userId = req.decodedToken?.userId;
    const {
      products,
      eventDate,
      startTime,
      endTime,
      location,
      type,
      addUplights,
      addedHours,
    } = req.body;
    
    console.log(products)

    try {
      // Validate product IDs and build line items
      const lineItems = products.map((product: { id: number; label: string; price: number, quantity: number }) => {
        const productInfo = PRODUCTS.find((p) => p.id === product.id);
      
        if (!productInfo || productInfo.price === undefined) {
          throw new Error(`Invalid product ID: ${product.id}`);
        }
      
        const unitPrice = productInfo.price;
      
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.label,
            },
            unit_amount: Math.round(unitPrice / 2),
          },
          quantity: product.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${DOMAIN_NAME}/successful-deposit`,
        cancel_url: `${DOMAIN_NAME}/cancelled-deposit`,
        automatic_tax: { enabled: false },
        metadata: {
          userId,
          eventDate,
          startTime,
          endTime,
          location,
          type,
          addUplights,
          addedHours,
          paymentType: 'deposit',
        },
      });

      res.json({ id: session.id });
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  },
);

router.post(
  '/pay-remaining',
  tokenExtractor,
  async (req: Request, res: Response) => {
    const userId = req.decodedToken?.userId;
    const {
      products,
      bookingId,
      eventDate,
      startTime,
      endTime,
      location,
      type,
    } = req.body;

    try {
      // Validate product IDs and build line items
      const lineItems = products.map(
        (product: { id: number; label: string; quantity: number }) => {
          const unitPrice = PRODUCTS[product.id].price;

          if (!unitPrice) {
            throw new Error(`Invalid product ID: ${product.id}`);
          }

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.label,
              },
              unit_amount: Math.round(unitPrice / 2),
            },
            quantity: product.quantity,
          };
        },
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${DOMAIN_NAME}/successful-paid-in-full`,
        cancel_url: `${DOMAIN_NAME}/cancelled-pay-second-half`,
        automatic_tax: { enabled: false },
        metadata: {
          userId,
          bookingId,
          eventDate,
          startTime,
          endTime,
          location,
          type,
          paymentType: 'remainingBalance',
        },
      });

      res.json({ id: session.id });
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  },
);

// Webhook that follows stripe payments
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, DEV_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const paymentType = session.metadata?.paymentType;
      const bookingId = session.metadata?.bookingId;
      const eventDate = session.metadata?.eventDate;
      const startTime = session.metadata?.startTime;
      const endTime = session.metadata?.endTime;
      const location = session.metadata?.location;
      const addUplights = session.metadata?.addUplights;
      const addedHours = session.metadata?.addedHours;
      const transactionId = session.payment_intent as string;
      const sessionAmount = session.amount_total
        ? session.amount_total / 100
        : 0;
      const totalAmount = session.amount_total ? session.amount_total * 2 : 0;

      if (!userId || !paymentType || !eventDate || !startTime || !endTime) {
        console.error('Missing metadata in session');
        return res.status(400).send('Missing metadata');
      }

      try {
        if (paymentType === 'deposit') {
          // 1. Create new booking
          const newBooking = await prisma.booking.create({
            data: {
              userId,
              eventDate: new Date(eventDate),
              startTime: new Date(startTime),
              endTime: new Date(endTime),
              location,
              totalAmount,
              addUplights,
              addedHours,
              type: paymentType,
              paymentStatus: 'depositReceived',
            },
          });

          if (!newBooking) {
            console.error('Error creating booking');
            return res.status(404).send('Booking not found');
          }

          // 2. Create new availability record
          const newAvailability = await prisma.availability.create({
            data: {
              date: newBooking.eventDate,
              startTime: newBooking.startTime,
              endTime: newBooking.endTime,
            },
          });

          if (!newAvailability) {
            console.error('Error creating unavailability record');
            return res.status(404).send('Booking not found');
          }

          // 3. Create new payment record
          const newPaymentRecord = await prisma.payment.create({
            data: {
              bookingId: newBooking.bookingId,
              amount: sessionAmount,
              deposit: true,
              method: 'stripe',
              transactionId,
            },
          });

          if (!newPaymentRecord) {
            console.error('Error creating payment record');
            return res.status(404).send('Booking not found');
          }

          // 3. Create new questionnaire
          const newQuestionnaire = await prisma.questionnaire.create({
            data: {
              userId,
              bookingId: newBooking.bookingId,
              answers: {},
            },
          });

          if (!newQuestionnaire) {
            console.error('Error creating questionnaire');
            return res.status(404).send('Booking not found');
          }
        } else if (paymentType === 'remainingBalance') {
          if (!bookingId) {
            console.error(
              'Missing bookingId in metadata for remaining balance',
            );
            return res.status(400).send('Missing bookingId');
          }
          // 1. Update payment status of booking
          const booking = await prisma.booking.update({
            where: { bookingId },
            data: {
              paymentStatus: 'depositReceived',
            },
          });

          if (!booking) {
            console.error('Error updating booking paymentStatus');
            return res.status(404).send('Booking not found');
          }

          // 2. Create new payment record
          const newPaymentRecord = await prisma.payment.create({
            data: {
              bookingId,
              amount: sessionAmount,
              deposit: false,
              method: 'stripe',
              transactionId,
            },
          });

          if (!newPaymentRecord) {
            console.error('Error creating payment record');
            return res.status(404).send('Booking not found');
          }
        }

        res.status(200).send();
      } catch (err) {
        console.error('Webhook processing failed:', err);
        res.status(500).send('Internal Server Error');
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata;
      const bookingId = metadata?.bookingId;
      const paymentType = metadata?.paymentType;

      if (!bookingId) {
        console.error('Missing bookingId in metadata');
        return res.status(400).send('Missing bookingId');
      }

      try {
        if (paymentType === 'deposit') {
          return res.status(404).send('Booking failed');
        } else if (paymentType === 'remainingBalance') {
          // Set paymentStatus to 'failed'
          const bookingUpdate = await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: 'remainingPaymentFailed',
            },
          });

          if (!bookingUpdate) {
            console.error('Error updating booking paymentStatus');
            return res.status(404).send('Booking not found');
          }
        }

        console.warn(`Payment failed for booking ${bookingId}`);
        res.status(200).send();
      } catch (err) {
        console.error(
          'Failed to update booking status on payment failure:',
          err,
        );
        res.status(500).send('Internal Server Error');
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(200).send();
  }
});

module.exports = router;
