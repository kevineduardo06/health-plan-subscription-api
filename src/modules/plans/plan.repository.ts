import type { Plan } from './plan.model.js';

const plans: Plan[] = [
  {
    id: 'plan_freemium',
    code: 'filoo_freemium',
    name: 'Filoo Freemium',
    tier: 'FREEMIUM',
    partnerId: 'partner_filoo',
    monthlyPriceCents: 0,
    active: true,
  },
  {
    id: 'plan_amil_basic',
    code: 'amil_basic',
    name: 'Amil Basic',
    tier: 'BASIC',
    partnerId: 'partner_amil',
    monthlyPriceCents: 4990,
    active: true,
  },
  {
    id: 'plan_sulamerica_premium',
    code: 'sulamerica_premium',
    name: 'SulAmérica Premium',
    tier: 'PREMIUM',
    partnerId: 'partner_sulamerica',
    monthlyPriceCents: 12990,
    active: true,
  },
];

export class PlanRepository {
  findById(id: string) {
    return plans.find((plan) => plan.id === id) ?? null;
  }

  findByCode(code: string) {
    return plans.find((plan) => plan.code === code) ?? null;
  }

  list() {
    return [...plans];
  }
}
