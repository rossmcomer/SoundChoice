require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    DEV_WEBHOOK_SECRET: process.env.DEV_WEBHOOK_SECRET,
  }
  