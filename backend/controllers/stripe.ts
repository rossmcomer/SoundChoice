const {
    STRIPE_SECRET,
    STRIPE_WEBHOOK_SECRET,
    DEV_WEBHOOK_SECRET,
    DOMAIN_NAME
  } = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()
import { Request, Response } from 'express';
  
// router.post('/create-checkout-session', async (req: Request, res: Response) => {
//   const { products, oktaUserId } = req.body

//   for (const product of products) {
//     const dbProduct = await Product.findByPk(product.id)

//     if (dbProduct.unitsInStock < product.quantity) {
//       return res.status(400).json({
//         error: `Insufficient stock for product: ${dbProduct.name}. Available: ${dbProduct.unitsInStock}, Requested: ${product.quantity}`,
//       })
//     }
//   }

//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: product.size
//           ? `${product.name} (Size: ${product.size})`
//           : product.name,
//         images: [product.images[0].imageUrl],
//       },
//       unit_amount: Math.round(product.unitPrice * 100),
//     },
//     quantity: product.quantity,
//   }))

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `${DOMAIN_NAME}/success`,
//       cancel_url: `${DOMAIN_NAME}/cancel`,
//       automatic_tax: { enabled: true },
//       metadata: { oktaUserId: oktaUserId },
//     })

//     res.json({ id: session.id })
//   } catch (error) {
//     console.error('Error creating checkout session:', error)
//     res.status(500).json({ error: error.message })
//   }
// })

// // Webhook that follows stripe payments
// router.post('/webhook', async (req: Request, res: Response) => {
//   const sig = req.headers['stripe-signature']

//   let event

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, DEV_WEBHOOK_SECRET)
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`)
//     return
//   }

//   switch (event.type) {
//     case 'checkout.session.completed':
//       const checkoutSessionCompleted = event.data.object

//       const orderDate = new Date(checkoutSessionCompleted.created * 1000)
//       const totalAmount = checkoutSessionCompleted.amount_total / 100
//       const salesTax = checkoutSessionCompleted.total_details.amount_tax / 100
//       const oktaUserId = checkoutSessionCompleted.metadata.oktaUserId

//       try {
//         // Save to orders table
//         const newOrder = await Order.create({
//           orderDate: orderDate,
//           totalAmount: totalAmount,
//           salesTax: salesTax,
//           oktaUserId: oktaUserId,
//         })

//         // Retrieve line items from the session to save in order_details table
//         const lineItems = await stripe.checkout.sessions.listLineItems(
//           checkoutSessionCompleted.id,
//         )

//         // Save each item in order_details table
//         for (const item of lineItems.data) {
//           const description = item.description

//           const match = description.match(/^(.+?)(?: \(Size: (\w+)\))?$/)

//           if (match) {
//             const productName = match[1]
//             const size = match[2] || null

//             const product = await Product.findOne({
//               where: {
//                 name: productName,
//                 size: size !== null ? size : null,
//               },
//             })

//             if (product) {
//               await OrderDetail.create({
//                 orderId: newOrder.id,
//                 productId: product.id,
//                 quantity: item.quantity,
//                 unitPrice: item.price.unit_amount / 100,
//                 salesTax: item.amount_tax / 100,
//               })

//               product.unitsInStock -= item.quantity
//               await product.save()
//             }
//           }
//         }

//         res.send()
//       } catch (error) {
//         console.error('Error saving order to database:', error)
//         res.status(500).send('Internal Server Error')
//       }

//       break
//     default:
//       console.log(`Unhandled event type ${event.type}`)
//   }
// })
  
  module.exports = router
  