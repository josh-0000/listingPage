const express = require('express');
const cors = require('cors');
require('./config/environmentVariables');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());

try {
  app.use('/auth', authRoutes);
} catch (error) {
  logger.error(error);
}

try {
  app.use('/listings', listingRoutes);
} catch (error) {
  logger.error(error);
}

try {
  app.use('/user', userRoutes);
}
catch (error) {
  logger.error(error);
}

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}/`);
});
