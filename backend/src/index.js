setTimeout(() => {
  const express = require('express');
  const { client } = require('./connection.js'); // Replace with the actual path

  const app = express();



  app.get('/dbtest', async (req, res) => {
  console.log("Received request for /dbtest");
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: err.message });
  }
  });

  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001/");
  });
},10000);
