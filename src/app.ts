import cors from 'cors';
import express from 'express';
import { errorHandler } from './shared/errors.js';
import { patientRoutes } from './modules/patients/patient.routes.js';
import { subscriptionRoutes } from './modules/subscriptions/subscription.routes.js';
import { partnerRoutes } from './modules/partners/partner.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/patients', patientRoutes());
  app.use('/subscriptions', subscriptionRoutes());
  app.use('/partners', partnerRoutes());
  app.use(errorHandler);

  return app;
}
