const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const dbConfig = require('./dbConfig');
const winston = require('winston');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());

app.use(cors());

const client = new Client(dbConfig);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] - ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

client.connect()
  .then(() => {
    logger.info('Connected to PostgreSQL database');
  })
  .catch((err) => {
    logger.error('Database connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Connected to database');
});

app.get('/listings', async (req, res) => {
  logger.info('Received request for /listings');
  try {
    const result = await client.query('SELECT * FROM listings');
    res.json(result.rows);
  } catch (err) {
    logger.error('Database query failed:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
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
      const userAddresses = await client.query('SELECT * FROM addresses WHERE userid = $1', [userID]);
      const userCarts = await client.query('SELECT * FROM carts WHERE userid = $1', [userID]);
      const userWishLists = await client.query('SELECT * FROM wishlists WHERE userid = $1', [userID]);

      let cards = [];

      console.log("stripeID:", stripeID);
      if (stripeID) {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: stripeID,
          type: 'card',
        });
        cards = paymentMethods.data.map((paymentMethod) => ({
          id: paymentMethod.id,
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          funding: paymentMethod.card.funding,
        }));
      }
      res.json({ 
        message: 'Login successful', 
        user: {
          userid: userID,
          stripeid: stripeID,
          email: userResult.rows[0].email,
          username: userResult.rows[0].username,
          addresses: userAddresses.rows,
          cart: userCarts.rows.map(cartItem => ({
            listingid: cartItem.listingid,
            quantity: cartItem.quantity
          })),
          wishlists: userWishLists.rows,
          cards: cards
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    logger.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  logger.info('Received request for /register');
  const { email, username, password } = req.body;

  try {
    const insertQuery = `
      INSERT INTO users (email, username, password)
      VALUES ($1, $2, $3)
      RETURNING userid, email, username
    `;
    const result = await client.query(insertQuery, [email, username, password]);

    const newUser = result.rows[0];
    res.status(201).json({ 
      message: 'Account created successfully',
      user: newUser
     });
    
    logger.info('Success', newUser);
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/save-card', async (req, res) => {
  const saveStripeCustomerIdForUser = async (userId, stripeCustomerId) => {
    const queryText = 'UPDATE users SET stripeid = $1 WHERE userid = $2';
    await client.query(queryText, [stripeCustomerId, userId]);
  };

  console.log("received request for /save-card");
  try {
    const tokenId = req.body.tokenId; // This should now be paymentMethodId
    const userId = req.body.userId;
    let stripeId = req.body.stripeId;

    if (!tokenId || !userId) {
      return res.status(400).send('Missing required parameters');
    }

    let addedCard;

    if (stripeId) {
      console.log("stripeId exists");
      
      // Convert the token to a PaymentMethod
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: tokenId }
      });
    
      // Attach the new payment method to the customer
      await stripe.paymentMethods.attach(paymentMethod.id, { customer: stripeId });

      addedCard = paymentMethod;
    
    } else {
      console.log("stripeId does not exist");
      
      // Convert the token to a PaymentMethod before creating a new customer
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: tokenId }
      });
      
      // Create a new customer with the PaymentMethod
      const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
      });
      
      // Save the customer.id as stripeId
      stripeId = customer.id;

      // Save the customer.id as stripeId in the database
      await saveStripeCustomerIdForUser(userId, stripeId);

      addedCard = paymentMethod;
    }

    const cardDetails = {
      id: addedCard.id,
      brand: addedCard.card.brand,
      last4: addedCard.card.last4,
      funding: addedCard.card.funding,
    };

    // Send the card details back to the client
    console.log(cardDetails);
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

const port = process.env.SERVER_PORT;
if (!port) {
  logger.error('No port specified in environment');
  process.exit(1);
}

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}/`);
});
