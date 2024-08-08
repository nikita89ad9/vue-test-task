<template>
  <RouterView
    :class="{
      'dark-theme': theme === 'dark' || (theme === 'system' && defaultSystemTheme === 'dark'),
    }"
  />
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';

  import { RouterView } from 'vue-router';

  import { useThemeStore } from './stores/themeStore/store';
  import { useUserStore } from './stores/userStore/store';

  const { getUserData } = useUserStore();
  const { theme, defaultSystemTheme } = storeToRefs(useThemeStore());

  getUserData();
</script>
