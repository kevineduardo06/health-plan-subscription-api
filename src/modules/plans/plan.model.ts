export type PlanTier = 'FREEMIUM' | 'BASIC' | 'PREMIUM';

export type Plan = {
  id: string;
  code: string;
  name: string;
  tier: PlanTier;
  partnerId: string;
  monthlyPriceCents: number;
  active: boolean;
};
