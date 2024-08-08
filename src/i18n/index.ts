import messages from '@intlify/unplugin-vue-i18n/messages';

import { isRef } from 'vue';
import { createI18n, type I18n, type I18nOptions } from 'vue-i18n';

import { getInitialLocale, LOCALE_STORAGE_KEY_LANG, setLocaleI18nStorage } from '@/i18n/helpers';
import { DEFAULT_LANG, isSupportLocaleType, type TLocalesLang } from '@/i18n/types';

const options: I18nOptions = {
  legacy: false,
  fallbackLocale: DEFAULT_LANG,
  messages,
};

const createLocales = () => {
  const initialLocale = getInitialLocale();

  const i18Instance = createI18n<false, typeof options>({
    ...options,
    locale: initialLocale,
  });

  const changeI18Language = (i18n: I18n) => (locale: TLocalesLang) => {
    if (!isSupportLocaleType(locale)) {
      console.error('changeI18Language:[function] unsupported locale type');

      return void 0;
    }

    if (isRef(i18n.global.locale)) {
      i18n.global.locale.value = locale;
    } else {
      i18n.global.locale = locale;
    }

    const node = document.querySelector('html');
    if (node) {
      node.setAttribute(LOCALE_STORAGE_KEY_LANG, locale);
    }

    setLocaleI18nStorage(locale);
  };

  return {
    i18Instance,
    changeI18Language: changeI18Language(i18Instance),
    initialLocale,
  };
};

export const { changeI18Language, i18Instance, initialLocale } = createLocales();
