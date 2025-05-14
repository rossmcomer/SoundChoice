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
import Stripe from 'stripe';

// Webhook that follows stripe payments
router.post('/', async (req: Request, res: Response) => {
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
      const type = session.metadata?.type;
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

      if (
        !userId ||
        !paymentType ||
        !eventDate ||
        !startTime ||
        !endTime ||
        !location ||
        !addUplights ||
        !addedHours
      ) {
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
              type,
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
