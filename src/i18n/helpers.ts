import { useCreateLocalStorage } from '@composables/useCreateLocalStorage';
import { isCatchHandlerError } from '@utils/errorHandler';

import { DEFAULT_LANG, isSupportLocaleType, type TLocalesLang } from '@/i18n/types';

export const LOCALE_STORAGE_KEY_LANG = 'lang';

const { get: getLocaleI18nStorage, set: setLocaleI18nStorage } =
  useCreateLocalStorage<TLocalesLang>(LOCALE_STORAGE_KEY_LANG);

const getInitialLocale = (): TLocalesLang => {
  const lang = getLocaleI18nStorage();
  const browserLang = window.navigator.language;

  if (lang && !isCatchHandlerError(lang) && isSupportLocaleType(lang)) {
    return lang;
  }

  return isSupportLocaleType(browserLang) ? browserLang : DEFAULT_LANG;
};

export { getInitialLocale, setLocaleI18nStorage, getLocaleI18nStorage };
