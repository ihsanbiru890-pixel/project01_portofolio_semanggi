const logger = require('../lib/logger.js');

const errorMiddleware = (err, req, res, next) => {
  logger.error('[Global Error Guard] %o', err);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
