import { Router } from 'express';
import { z } from 'zod';
import { SubscriptionService } from './subscription.service.js';

const createSubscriptionSchema = z.object({
  patientId: z.string(),
  planId: z.string(),
});

export function subscriptionRoutes(subscriptionService = new SubscriptionService()) {
  const router = Router();

  router.get('/', (_request, response) => {
    return response.json(subscriptionService.list());
  });

  router.post('/', (request, response, next) => {
    try {
      const input = createSubscriptionSchema.parse(request.body);
      const subscription = subscriptionService.create(input);
      return response.status(201).json(subscription);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
