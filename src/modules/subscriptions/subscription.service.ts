import { AppError } from '../../shared/errors.js';
import { PatientRepository } from '../patients/patient.repository.js';
import { PlanRepository } from '../plans/plan.repository.js';
import { PartnerRepository } from '../partners/partner.repository.js';
import { SubscriptionRepository } from './subscription.repository.js';

export type CreateSubscriptionRequest = {
  patientId: string;
  planId: string;
};

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository = new SubscriptionRepository(),
    private readonly patientRepository = new PatientRepository(),
    private readonly planRepository = new PlanRepository(),
    private readonly partnerRepository = new PartnerRepository(),
  ) {}

  create(input: CreateSubscriptionRequest) {
    const patient = this.patientRepository.findById(input.patientId);
    if (!patient || !patient.active || patient.deletedAt !== null) {
      throw new AppError('Subscription requires an active patient', 400);
    }

    const plan = this.planRepository.findById(input.planId);
    if (!plan || !plan.active) {
      throw new AppError('Subscription requires an active plan', 400);
    }

    const activeSubscription = this.subscriptionRepository.findActiveByPatientId(input.patientId);
    if (activeSubscription) {
      throw new AppError('Patient already has an active subscription', 409);
    }

    return this.subscriptionRepository.create(input);
  }

  list() {
    return this.subscriptionRepository.list();
  }

  derivePartnerOrigin(patientId: string) {
    const patient = this.patientRepository.findById(patientId);
    if (!patient) {
      throw new AppError('Patient not found', 404);
    }

    const patientSubscriptions = this.subscriptionRepository.findByPatientId(patientId);
    if (patientSubscriptions.length === 0) {
      return null;
    }

    const activeSubscription = patientSubscriptions.find((subscription) => subscription.status === 'ACTIVE');
    const activePlan = activeSubscription ? this.planRepository.findById(activeSubscription.planId) : null;

    if (activePlan && activePlan.tier !== 'FREEMIUM') {
      return this.partnerRepository.findById(activePlan.partnerId);
    }

    const latestPremiumSubscription = [...patientSubscriptions]
      .reverse()
      .find((subscription) => {
        const plan = this.planRepository.findById(subscription.planId);
        return plan?.tier === 'PREMIUM' || plan?.tier === 'BASIC';
      });

    if (latestPremiumSubscription) {
      const premiumPlan = this.planRepository.findById(latestPremiumSubscription.planId);
      return premiumPlan ? this.partnerRepository.findById(premiumPlan.partnerId) : null;
    }

    return activePlan ? this.partnerRepository.findById(activePlan.partnerId) : null;
  }
}
