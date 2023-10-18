const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe Secret Key. Set STRIPE_SECRET_KEY environment variable.');
}

if (!process.env.DB_HOST) {
  throw new Error('Missing DB_HOST environment variable.');
}

if (!process.env.DB_PORT) {
  throw new Error('Missing DB_PORT environment variable.');
}

if (!process.env.DB_USER) {
  throw new Error('Missing DB_USER environment variable.');
}

if (!process.env.DB_PASSWORD) {
  throw new Error('Missing DB_PASSWORD environment variable.');
}

if (!process.env.DB_DATABASE) {
  throw new Error('Missing DB_DATABASE environment variable.');
}