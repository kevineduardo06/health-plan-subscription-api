import { nextId } from '../../shared/id.js';
import type { Subscription, SubscriptionStatus } from './subscription.model.js';

const subscriptions: Subscription[] = [];

export type CreateSubscriptionInput = {
  patientId: string;
  planId: string;
  status?: SubscriptionStatus;
};

export class SubscriptionRepository {
  create(input: CreateSubscriptionInput) {
    const subscription: Subscription = {
      id: nextId('subscription'),
      patientId: input.patientId,
      planId: input.planId,
      status: input.status ?? 'ACTIVE',
      startedAt: new Date().toISOString(),
      endedAt: null,
    };

    subscriptions.push(subscription);
    return subscription;
  }

  update(subscription: Subscription) {
    const index = subscriptions.findIndex((item) => item.id === subscription.id);
    if (index >= 0) {
      subscriptions[index] = subscription;
    }
    return subscription;
  }

  findByPatientId(patientId: string) {
    return subscriptions.filter((subscription) => subscription.patientId === patientId);
  }

  findActiveByPatientId(patientId: string) {
    return subscriptions.find(
      (subscription) => subscription.patientId === patientId && subscription.status === 'ACTIVE',
    ) ?? null;
  }

  list() {
    return [...subscriptions];
  }

  clear() {
    subscriptions.length = 0;
  }
}
