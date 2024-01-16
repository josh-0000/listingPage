const express = require('express');
const { client, handleError } = require('../utils/client');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();


const createStripeSession = async (stripeid, line_items) => {
  const sessionData = {
    billing_address_collection: 'required',
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
  };

  if (stripeid !== "Guest") {
    sessionData.customer = stripeid;
  }

  return await stripe.checkout.sessions.create(sessionData);
};

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products, stripeid } = req.body;
    if (!products || products.length === 0) throw new Error('No products selected');

    const convertToCents = (amount) => Math.round(amount * 100);
    
    const formattedProducts = [];

    for (const product of products) {
      const { listingid, quantity } = product;
      const result = await client.query('SELECT * FROM listings WHERE listingid = $1', [listingid]);

      if (result.rows.length === 0) {
        throw new Error(`No listing found for id: ${listingid}`);
      }

      const listing = result.rows[0];
      formattedProducts.push({
        name: listing.listingname,
        unit_amount: convertToCents(listing.price),
        quantity: quantity,
      });
    }

    const line_items = formattedProducts.map(({ name, unit_amount, quantity }) => ({
      price_data: {
        currency: 'usd',
        product_data: { name },
        unit_amount,
      },
      quantity,
    }));

    const session = await createStripeSession(stripeid, line_items);
    res.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe Checkout session:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create-portal-session', async (req, res) => {
  const { customerId } = req.body;  // Read customerID from request body

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'http://localhost:3000',
  });

  res.send({ url: session.url });
});



module.exports = router;