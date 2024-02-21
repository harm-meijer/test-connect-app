import express, { Express, Request } from 'express';
import { logger } from './utils/logger.utils';
import {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';

const PORT = 8080;

// Create the express app
const app: Express = express();
app.use(
  createSessionMiddleware({
    audience:
      'https://service-ef6aa1fb-998a-4455-9f80-f61e4bdbbe26.europe-west1.gcp.preview.commercetools.app',
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

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
