const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const apiRoutes = require('./routes/index.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const logger = require('./lib/logger.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev', {
  stream: { write: (message) => logger.info(message.trim()) }
}));
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Semanggi API (JavaScript)' });
});

// Mount all modular API components
app.use('/api', apiRoutes);

// Global Error Guard
app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
