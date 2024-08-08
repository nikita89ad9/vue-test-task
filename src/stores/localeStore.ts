import { defineStore } from 'pinia';

import { ref } from 'vue';

import { changeI18Language, initialLocale } from '@/i18n';
import type { TLocalesLang } from '@/i18n/types';

const LOCALE_STORE_ID = 'locale_store';
export const useLocaleStore = defineStore(LOCALE_STORE_ID, () => {
  const lang = ref<TLocalesLang>(initialLocale);

  const setLang = (newLang: TLocalesLang) => {
    lang.value = newLang;

    changeI18Language(newLang);
  };

  return { lang, setLang };
});
