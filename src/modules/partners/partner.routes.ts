import { Router } from 'express';
import { SubscriptionService } from '../subscriptions/subscription.service.js';

export function partnerRoutes(subscriptionService = new SubscriptionService()) {
  const router = Router();

  router.get('/:patientId/origin', (request, response, next) => {
    try {
      const partner = subscriptionService.derivePartnerOrigin(request.params.patientId);
      return response.json({ partner });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
