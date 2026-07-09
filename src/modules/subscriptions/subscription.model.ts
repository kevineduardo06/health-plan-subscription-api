export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED';

export type Subscription = {
  id: string;
  patientId: string;
  planId: string;
  status: SubscriptionStatus;
  startedAt: string;
  endedAt: string | null;
};
