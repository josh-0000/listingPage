const { Client } = require('pg');

const client = new Client(
  {
    host: "database", // Use service name as hostname
    port: 5432,
    user: "jg",
    password: "03asd3wsada",
    database: "listings",
  });

client.connect()
  .then(() => console.log('Connected to PostgreSQL database!'))
  .catch(err => console.error('Connection failed:', err));

module.exports = { client };