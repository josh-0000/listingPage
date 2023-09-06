const express = require('express');
const { client } = require('./connection.js');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Connected to database');
});

app.get('/listings', async (req, res) => {
  console.log("Received request for /listings");
  try {
    const result = await client.query('SELECT * FROM listings');
    res.json(result.rows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Assuming JSON request body with "email" and "password"

  // Create a PostgreSQL client
  const client = new Client(dbConfig);

  try {
    await client.connect(); // Connect to the database

    // Query to select user based on email and password
    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
      values: [email, password],
    };

    const result = await client.query(query);

    if (result.rows.length === 1) {
      // User with matching credentials found
      res.json({ message: 'Login successful', user: result.rows[0] });
    } else {
      // No matching user found
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the database connection
    await client.end();
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001/");
});
