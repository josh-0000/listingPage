const express = require('express');
const { client, handleError } = require('../utils/client');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products, stripeid } = req.body;
    console.log(products);
    console.log(stripeid);
    if (!products || products.length === 0) throw new Error('No products selected');
    if (!stripeid) throw new Error('No stripeid provided');

    const convertToCents = (amount) => amount * 100;

    const formattedProducts = [];

    for (const product of products) {
      const { listingid, quantity } = product;
      const result = await client.query('SELECT * FROM listings WHERE listingid = $1', [listingid]);

      if (result.rows.length === 0) {
        throw new Error(`No listing found for id: ${listingid}`);
      }

      const listing = result.rows[0];
      console.log(convertToCents(listing.price));
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

    const session = await stripe.checkout.sessions.create({
      customer: stripeid,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

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