import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar_store', () => {
  const sidebarState = ref<boolean>(false);

  const toggleSidebarState = () => {
    sidebarState.value = !sidebarState.value;
  };

  return {
    sidebarState,
    toggleSidebarState,
  };
});
