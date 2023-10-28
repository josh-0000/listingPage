const express = require('express');
const { client, handleError, getClientForTransaction } = require('../utils/client');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/save-cart', async (req, res) => {
  logger.info('Received request for /save-cart');
  console.log("Received request for /save-cart");
  const { userId, cart } = req.body;

  console.log("cart:", cart);
  try {
    const transactionClient = await getClientForTransaction();
    await transactionClient.query('BEGIN');

    const deleteQuery = 'DELETE FROM carts WHERE userid = $1';
    await transactionClient.query(deleteQuery, [userId]);

    const insertPromises = cart.map(cartItem => 
      transactionClient.query('INSERT INTO carts (userid, listingid, quantity) VALUES ($1, $2, $3)', [userId, cartItem.listingid, cartItem.quantity])
    );
    await Promise.all(insertPromises);

    await transactionClient.query('COMMIT');
    transactionClient.release();
    console.log("Cart saved successfully");
    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error) {
    console.log("Error saving cart: rolling back", error);
    await transactionClient.query('ROLLBACK');
    transactionClient.release();
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;