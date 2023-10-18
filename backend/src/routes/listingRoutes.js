const express = require('express');
const { client, handleError } = require('../utils/client');
const logger = require('../utils/logger');
const router = express.Router();

router.get('/listings', async (req, res) => {
  logger.info('Received request for /listings');
  try {
    const result = await client.query('SELECT * FROM listings');
    res.json(result.rows);
  } catch (err) {
    logger.error('Database query failed:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;