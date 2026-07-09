import { beforeEach, describe, expect, it } from 'vitest';
import { resetIdsForTests } from '../src/shared/id.js';
import { PatientRepository } from '../src/modules/patients/patient.repository.js';
import { PatientService } from '../src/modules/patients/patient.service.js';
import { SubscriptionRepository } from '../src/modules/subscriptions/subscription.repository.js';
import { SubscriptionService } from '../src/modules/subscriptions/subscription.service.js';
import { PlanRepository } from '../src/modules/plans/plan.repository.js';
import { PartnerRepository } from '../src/modules/partners/partner.repository.js';

const patientRepository = new PatientRepository();
const subscriptionRepository = new SubscriptionRepository();
const planRepository = new PlanRepository();
const partnerRepository = new PartnerRepository();
const patientService = new PatientService(patientRepository);
const subscriptionService = new SubscriptionService(
  subscriptionRepository,
  patientRepository,
  planRepository,
  partnerRepository,
);

describe('SubscriptionService', () => {
  beforeEach(() => {
    patientRepository.clear();
    subscriptionRepository.clear();
    resetIdsForTests();
  });

  it('creates a subscription for an active patient and active plan', () => {
    const patient = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    const subscription = subscriptionService.create({
      patientId: patient.id,
      planId: 'plan_amil_basic',
    });

    expect(subscription.status).toBe('ACTIVE');
    expect(subscription.patientId).toBe(patient.id);
  });

  it('prevents duplicate active subscriptions', () => {
    const patient = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    subscriptionService.create({ patientId: patient.id, planId: 'plan_amil_basic' });

    expect(() =>
      subscriptionService.create({ patientId: patient.id, planId: 'plan_sulamerica_premium' }),
    ).toThrow('Patient already has an active subscription');
  });

  it('derives partner origin from the current premium plan', () => {
    const patient = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    subscriptionService.create({ patientId: patient.id, planId: 'plan_sulamerica_premium' });

    expect(subscriptionService.derivePartnerOrigin(patient.id)?.id).toBe('partner_sulamerica');
  });

  it('returns null partner origin when patient has no subscriptions', () => {
    const patient = patientService.create({
      name: 'Holder',
      cpf: '12345678901',
      type: 'HOLDER',
    });

    expect(subscriptionService.derivePartnerOrigin(patient.id)).toBeNull();
  });
});
