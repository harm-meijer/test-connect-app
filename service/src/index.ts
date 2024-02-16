import express, { Express } from 'express';
import { logger } from './utils/logger.utils';

const PORT = 8080;

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define configurations

// Define routes
app.use('/service', (req, res) => {
  res.json({ message: 'Service is running' });
});

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
