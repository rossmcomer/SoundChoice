require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  DOMAIN_NAME: process.env.DOMAIN_NAME,
  DOMAIN_NAME_DEV: process.env.DOMAIN_NAME_DEV,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  DEV_WEBHOOK_SECRET: process.env.DEV_WEBHOOK_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_SECRET: process.env.PAYPAL_SECRET,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};
