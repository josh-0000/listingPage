const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const dbConfig = require('./dbConfig');
const winston = require('winston');

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

    const result = await client.query(query);

    if (result.rows.length === 1) {
      res.json({ 
        message: 'Login successful', 
        user: {
          id: result.rows[0].userid,
          email: result.rows[0].email,
          username: result.rows[0].username,
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}/`);
});
