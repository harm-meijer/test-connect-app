import * as express from 'express';
import { Express } from 'express';
import { logger } from './utils/logger.utils';
import { config } from 'dotenv';
config();

const PORT = 8080;

// Create the express app
const app: Express = (
  express as unknown as { default: () => Express }
).default();
app.disable('x-powered-by');

// Define configurations

// Define routes
app.use('/service', (_req, res) => {
  res.json({
    SERVICE_URL: process.env.SERVICE_URL,
    GLOBAL_SECURED: process.env.GLOBAL_SECURED,
    GLOBAL_STANDARD: process.env.GLOBAL_STANDARD,
  });
});
logger.info(`service url ${process.env.SERVICE_URL}`);
logger.info(`global seured ${process.env.GLOBAL_SECURED}`);
logger.info(`global standard ${process.env.GLOBAL_STANDARD}`);
// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
