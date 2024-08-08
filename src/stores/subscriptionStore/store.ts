import { defineStore } from 'pinia';

import { reactive } from 'vue';

import type { ISubscription } from '@/pages/Subscriptions/components/types';
import type { TUIUniqid } from '@utils/UIUniqid';
import { subscriptionData } from './subscriptionData';

export const useSubscriptionStore = defineStore('subs_store', () => {
  const rates = reactive<ISubscription[]>(subscriptionData);
  const activeRateId = reactive<Set<TUIUniqid>>(new Set());

  const setActive = (id: TUIUniqid) => {
    activeRateId.clear();

    activeRateId.add(id);
  };

  const isActive = (id: TUIUniqid) => {
    return activeRateId.has(id);
  };

  return { rates, isActive, setActive };
});
