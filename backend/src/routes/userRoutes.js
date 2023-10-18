const express = require('express');
const { client, handleError } = require('../utils/client');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/save-card', async (req, res) => {
  const saveStripeCustomerIdForUser = async (userId, stripeCustomerId) => {
    const queryText = 'UPDATE users SET stripeid = $1 WHERE userid = $2';
    await client.query(queryText, [stripeCustomerId, userId]);
  };

  console.log("received request for /save-card");
  try {
    const tokenId = req.body.tokenId;
    const userId = req.body.userId;
    let stripeId = req.body.stripeId;

    if (!tokenId || !userId) {
      return res.status(400).send('Missing required parameters');
    }

    let addedCard;

    if (stripeId) {
      console.log("stripeId exists");

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: tokenId }
      });

      await stripe.paymentMethods.attach(paymentMethod.id, { customer: stripeId });

      addedCard = paymentMethod;
    
    } else {
      console.log("stripeId does not exist");

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: tokenId }
      });

      const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
      });

      stripeId = customer.id;

      await saveStripeCustomerIdForUser(userId, stripeId);

      addedCard = paymentMethod;
    }

    const cardDetails = {
      id: addedCard.id,
      brand: addedCard.card.brand,
      last4: addedCard.card.last4,
      funding: addedCard.card.funding,
    };

    res.status(200).json({
      message: 'Card saved successfully',
      card: cardDetails,
      stripeId: stripeId
    });
  } catch (error) {
    console.error("Error saving card:", error);
    res.status(500).send('An error occurred while processing your request');
  }
});

router.post('/delete-card', async (req, res) => {
  const deleteCard = async (cardId) => {
    await stripe.paymentMethods.detach(cardId);
  };

  console.log("received request for /delete-card");
  try {
    const cardId = req.body.cardid;
    const stripeId = req.body.stripeId;

    if (!cardId || !stripeId) {
      return res.status(400).send('Missing required parameters');
    }

    await deleteCard(cardId);

    res.status(200).json({
      message: 'Card deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).send('An error occurred while processing your request');
  }
});

router.post('/default-card', async (req, res) => {
  console.log("received request for /default-card");
  try {
      const cardId = req.body.cardid;
      const stripeId = req.body.stripeId;

      if (!cardId || !stripeId) {
          return res.status(400).send('Missing required parameters');
      }

      const customer = await stripe.customers.retrieve(stripeId);
      const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

      if (cardId === defaultPaymentMethodId) {
          await stripe.customers.update(stripeId, {
              invoice_settings: {
                  default_payment_method: null
              }
          });

          return res.status(200).json({
              message: 'The provided card was already the default payment. It has now been removed as the default.'
          });
      } else {
          await stripe.customers.update(stripeId, {
              invoice_settings: {
                  default_payment_method: cardId
              }
          });

          return res.status(200).json({
              message: 'Default card set successfully'
          });
      }

  } catch (error) {
      console.error("Error setting default card:", error);
      res.status(500).send('An error occurred while processing your request');
  }
});

router.post('/save-cart', async (req, res) => {
  logger.info('Received request for /save-cart');
  console.log("Received request for /save-cart");
  const { userId, cart } = req.body;

  console.log("cart:", cart);
  try {
    await client.query('BEGIN');

    const deleteQuery = 'DELETE FROM carts WHERE userid = $1';
    await client.query(deleteQuery, [userId]);

    const insertPromises = cart.map(cartItem => 
      client.query('INSERT INTO carts (userid, listingid, quantity) VALUES ($1, $2, $3)', [userId, cartItem.listingid, cartItem.quantity])
    );
    await Promise.all(insertPromises);

    await client.query('COMMIT');
    console.log("Cart saved successfully");
    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error) {
    console.log("Error saving cart: rolling back", error);
    await client.query('ROLLBACK');
    logger.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;