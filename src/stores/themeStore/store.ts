import { defineStore } from 'pinia';

import { ref } from 'vue';

import type { TTheme } from './types';

export const useThemeStore = defineStore('theme_store', () => {
  const defaultSystemTheme = ref<TTheme>(
    window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const theme = ref<TTheme>((localStorage.getItem('theme') as TTheme) || defaultSystemTheme.value);

  const setTheme = (value: TTheme) => {
    theme.value = value;
    localStorage.setItem('theme', theme.value);
  };

  return { theme, defaultSystemTheme, setTheme };
});
