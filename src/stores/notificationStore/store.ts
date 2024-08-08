import { defineStore } from 'pinia';

import { ref } from 'vue';

import type { ICheckbox } from '@/components/common/BaseCheckbox/types';

export const useNotificationStore = defineStore('notification_store', () => {
  const notifications = ref<ICheckbox[]>([]);

  const setNotifications = (notions: ICheckbox[]) => {
    notifications.value = notions;
  };

  return { notifications, setNotifications };
});
