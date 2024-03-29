const express = require('express');
const { client, handleError } = require('../utils/client');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/login', async (req, res) => {
  logger.info('Received request for /login');
  const { email, password } = req.body;

  try {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
      values: [email, password],
    };

    const userResult = await client.query(query);

    if (userResult.rows.length === 1) {
      const userID = userResult.rows[0].userid;
      const stripeID = userResult.rows[0].stripeid;
      const userCarts = await client.query('SELECT * FROM carts WHERE userid = $1', [userID]);
      const userWishLists = await client.query('SELECT * FROM wishlists WHERE userid = $1', [userID]);
      
      let stripeCustomer;
      if (stripeID) {
        stripeCustomer = await stripe.customers.retrieve(stripeID); 
      }
      const username = stripeCustomer.name;
      const phoneNumber = stripeCustomer.phone;
      res.json({
        message: 'Login successful', 
        user: {
          userid: userID,
          stripeid: stripeID,
          email: email,
          phoneNumber: phoneNumber,
          username: username,
          cart: userCarts.rows.map(cartItem => ({
            listingid: cartItem.listingid,
            quantity: cartItem.quantity
          })),
          wishlists: userWishLists.rows,
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    handleError(error, res);
  }
});

router.post('/register', async (req, res) => {
  logger.info('Received request for /register');
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  try {
    const insertQuery = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING userid
    `;
    const result = await client.query(insertQuery, [email, password]);
    const newUser = result.rows[0];

    const stripeCustomer = await stripe.customers.create({
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phoneNumber,
      description: `Customer for user ID ${newUser.userid}`
    });

    if (!stripeCustomer || !stripeCustomer.id) {
      throw new Error('Failed to create Stripe customer.');
    }

    const updateStripeIdQuery = `
      UPDATE users
      SET stripeid = $1
      WHERE userid = $2
    `;
    await client.query(updateStripeIdQuery, [stripeCustomer.id, newUser.userid]);

    const username = `${firstName} ${lastName}`;
    res.status(201).json({ 
      message: 'Account and Stripe customer created successfully',
      user: 
        {
          userid: newUser.userid,
          stripeid: stripeCustomer.id,
          email: email,
          phoneNumber: phoneNumber,
          username: username,
          cart: [],
          wishlists: [],
        }
    });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;