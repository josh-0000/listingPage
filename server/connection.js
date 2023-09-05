const { Client } = require('pg');

const client = new Client({
  host: "postgres", // Name of the service in docker-compose.yml
  port: 5432,
  user: "jg",
  password: "03asd3wsada",
  database: "listings",
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database!'))
  .catch(err => console.error('Connection failed:', err));

module.exports = { client };
