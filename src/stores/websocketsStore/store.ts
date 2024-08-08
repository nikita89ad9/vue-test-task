import { defineStore, storeToRefs } from 'pinia';

import { wssService } from '@/api/websocket';
import { useUserStore } from '../userStore/store';

export const useWebSocketsStore = defineStore('websockets store', () => {
  const { user } = storeToRefs(useUserStore());

  const connectSocket = () => {
    if (!user.value?.id) return;

    wssService.connect(user.value.id);
  };

  const disconnectSocket = () => {
    wssService.disconnect();
  };

  return {
    connectSocket,
    disconnectSocket,
  };
});
