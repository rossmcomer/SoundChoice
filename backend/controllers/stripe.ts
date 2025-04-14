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
      success_url: `${DOMAIN_NAME}/success`,
      cancel_url: `${DOMAIN_NAME}/cancel`,
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
  const sig = req.headers['stripe-signature']

  let event

  // const session = event.data.object

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, DEV_WEBHOOK_SECRET)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object

      const orderDate = new Date(checkoutSessionCompleted.created * 1000)
      const totalAmount = checkoutSessionCompleted.amount_total / 100
      const salesTax = checkoutSessionCompleted.total_details.amount_tax / 100
      const oktaUserId = checkoutSessionCompleted.metadata.oktaUserId

      try {
        // Save to orders table
        const newOrder = await prisma.booking.create({
          orderDate: orderDate,
          totalAmount: totalAmount,
          salesTax: salesTax,
          oktaUserId: oktaUserId,
        })

        // Retrieve line items from the session to save in order_details table
        const lineItems = await stripe.checkout.sessions.listLineItems(
          checkoutSessionCompleted.id,
        )

        // Save each item in order_details table
        for (const item of lineItems.data) {
          const description = item.description

          const match = description.match(/^(.+?)(?: \(Size: (\w+)\))?$/)

          if (match) {
            const productName = match[1]
            const size = match[2] || null

            const product = await Product.findOne({
              where: {
                name: productName,
                size: size !== null ? size : null,
              },
            })

            if (product) {
              await OrderDetail.create({
                orderId: newOrder.id,
                productId: product.id,
                quantity: item.quantity,
                unitPrice: item.price.unit_amount / 100,
                salesTax: item.amount_tax / 100,
              })

              product.unitsInStock -= item.quantity
              await product.save()
            }
          }
        }

        res.send()
      } catch (error) {
        console.error('Error saving order to database:', error)
        res.status(500).send('Internal Server Error')
      }

      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
})

module.exports = router;
