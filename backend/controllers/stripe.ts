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
import { PRICE_LIST } from '../assets/priceList'
import Stripe from 'stripe';
const { tokenExtractor } = require('../util/middleware');

router.post('/pay-deposit', tokenExtractor, async (req: Request, res: Response) => {
  const userId = req.decodedToken?.userId;
  const { products, bookingId } = req.body;

  try {
    // Validate product IDs and build line items
    const lineItems = products.map((product: { id: string; name: string; quantity: number }) => {
      const unitPrice = PRICE_LIST[product.id];

      if (!unitPrice) {
        throw new Error(`Invalid product ID: ${product.id}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
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
      automatic_tax: { enabled: true },
      metadata: { userId, bookingId, paymentType: 'deposit' },
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/pay-remaining', tokenExtractor, async (req: Request, res: Response) => {
  const userId = req.decodedToken?.userId;
  const { products, bookingId } = req.body;

  try {
    // Validate product IDs and build line items
    const lineItems = products.map((product: { id: string; name: string; quantity: number }) => {
      const unitPrice = PRICE_LIST[product.id];

      if (!unitPrice) {
        throw new Error(`Invalid product ID: ${product.id}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
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
      success_url: `${DOMAIN_NAME}/successful-paid-in-full`,
      cancel_url: `${DOMAIN_NAME}/cancelled-pay-second-half`,
      automatic_tax: { enabled: true },
      metadata: { userId, bookingId, paymentType: 'remainingBalance' },
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

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
      const bookingId = session.metadata?.bookingId;
      const paymentType = session.metadata?.paymentType;
      const transactionId = session.payment_intent as string;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;

      if (!userId || !bookingId || !paymentType) {
        console.error('Missing metadata in session');
        return res.status(400).send('Missing metadata');
      }

      try {
        if (paymentType === 'deposit') {
          const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

          if (!booking) {
            console.error('Booking not found for ID:', bookingId);
            return res.status(404).send('Booking not found');
          }

          // 1. Create new availability record
          await prisma.availability.create({
            data: {
              date: booking.eventDate,
              startTime: booking.startTime,
              endTime: booking.endTime,
            },
          });

          // 2. Update booking's payment status
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: 'depositReceived',
            },
          });

          // 3. Create new payment record
          await prisma.payment.create({
            data: {
              bookingId,
              amount: amountTotal,
              deposit: true,
              method: 'stripe',
              transactionId,
            },
          });
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
        console.warn('Payment failed but no bookingId found in metadata.');
        return res.status(400).send('Missing bookingId');
      }

      try {
        if (paymentType === 'deposit') {
          // Set paymentStatus to 'failed'
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: 'unpaid',
            },
          });
        }
        else if (paymentType === 'remainingBalance'){
          // Set paymentStatus to 'failed'
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: 'unpaid',
            },
          });
        }
        
        

        console.warn(`Payment failed for booking ${bookingId}`);
        res.status(200).send();
      } catch (err) {
        console.error('Failed to update booking status on payment failure:', err);
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
