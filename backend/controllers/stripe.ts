const {
  STRIPE_SECRET,
  STRIPE_WEBHOOK_SECRET,
  DEV_WEBHOOK_SECRET,
  DOMAIN_NAME,
} = require('../util/config');
const stripe = require('stripe')(STRIPE_SECRET);
const router = require('express').Router();
const express = require('express')
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
      bookingId,
      eventDate,
      startTime,
      endTime,
      location,
      type,
      addUplights,
      addedHours,
    } = req.body;

    try {
      // Step 1: Build products array from booking info
      const products: {
        id: number;
        label: string;
        price: number;
        quantity: number;
      }[] = [];

      // Add event type product (e.g., wedding, corporate, etc.)
      const typeProduct = PRODUCTS.find((p) => p.value === type);
      if (typeProduct) {
        products.push({
          id: typeProduct.id,
          label: typeProduct.label,
          price: typeProduct.price,
          quantity: 1,
        });
      } else {
        throw new Error(`Invalid event type: ${type}`);
      }

      // Add uplighting if applicable
      if (addUplights) {
        const uplightProduct = PRODUCTS.find((p) => p.value === 'uplights');
        if (uplightProduct) {
          products.push({
            id: uplightProduct.id,
            label: uplightProduct.label,
            price: uplightProduct.price,
            quantity: 1,
          });
        }
      }

      // Add added hours if applicable
      if (addedHours && addedHours > 0) {
        const addTimeProduct = PRODUCTS.find((p) => p.value === 'addTime');
        if (addTimeProduct) {
          products.push({
            id: addTimeProduct.id,
            label: addTimeProduct.label,
            price: addTimeProduct.price,
            quantity: addedHours,
          });
        }
      }

      // Step 2: Convert products to Stripe line_items
      const lineItems = products.map((product) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.label,
            },
            unit_amount: Math.round(product.price / 2), // remaining 50% balance
          },
          quantity: product.quantity,
        };
      });

      // Step 3: Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${DOMAIN_NAME}/successful-paid-in-full`,
        cancel_url: `${DOMAIN_NAME}/cancelled-second-payment`,
        automatic_tax: { enabled: false },
        metadata: {
          userId,
          bookingId,
          eventDate,
          startTime,
          endTime,
          location,
          type,
          addUplights,
          addedHours,
          paymentType: 'remainingBalance',
        },
      });

      res.json({ id: session.id });
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
