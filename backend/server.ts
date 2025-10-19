const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
  PORT,
  DOMAIN_NAME,
  DOMAIN_NAME_DEV,
  DOMAIN_NAME_SECURE,
  NGROK_DOMAIN,
} = require('./util/config');
const { connectToDatabase } = require('./util/db.ts');
import { Request, Response, NextFunction } from 'express';
import csurf from 'csurf';
const { csrfErrorHandler } = require('./util/middleware');

const usersRouter = require('./controllers/users');
const availabilityRouter = require('./controllers/availability');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const bookingsRouter = require('./controllers/bookings');
const questionsRouter = require('./controllers/questionnaires');
const adminRouter = require('./controllers/admin');
const stripeRouter = require('./controllers/stripe');
const stripeWebhookRouter = require('./controllers/stripeWebhook');
const productsRouter = require('./controllers/products');
const testimonialsRouter = require('./controllers/testimonials');
const csrfRouter = require('./controllers/csrf');

app.use(cookieParser());
app.use(
  cors({
    origin: [DOMAIN_NAME, DOMAIN_NAME_DEV, DOMAIN_NAME_SECURE, NGROK_DOMAIN],
    credentials: true,
  }),
);

app.use(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookRouter,
);

app.use(express.json());

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/api/stripe-webhook')) {
    console.log('Skipping CSRF for Stripe webhook');
    return next(); // Skip CSRF for Stripe webhook
  }
  return csrfProtection(req, res, next); // ✅ Apply CSRF to all other routes
});

app.use('/api/users', usersRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/products', productsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/csrf-token', csrfRouter);

app.use(csrfErrorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
