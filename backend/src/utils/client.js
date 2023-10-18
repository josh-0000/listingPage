const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

const client = {
  query: async (text, params, callback) => {
    const clientFromPool = await pool.connect();
    try {
      return await clientFromPool.query(text, params, callback);
    } finally {
      clientFromPool.release();
    }
  },
};

const getClientForTransaction = async () => {
  const clientFromPool = await pool.connect();
  return clientFromPool;
};

const handleError = (error, res) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
  client,
  handleError,
  getClientForTransaction,
};