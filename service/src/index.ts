import express, { Express, Request } from 'express';
import { logger } from './utils/logger.utils';
import {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import { config } from 'dotenv';
config();

const PORT = 8080;

// Create the express app
const app: Express = express();
app.use(
  createSessionMiddleware({
    audience: process.env.SERVICE_URL as string,
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.disable('x-powered-by');

// Define configurations

// Define routes
type TSession = {
  session: {
    userId: string;
    projectKey: string;
    userPermissions?: string[];
  };
} & Request;
app.use('/service', (req, res) => {
  const r = req as TSession;
  res.json({
    message: 'Service is running',
    userId: r.session.userId,
    projectKey: r.session.projectKey,
    userPermissions: r.session.userPermissions,
  });
});
logger.info(`service url ${process.env.SERVICE_URL}`);
// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
