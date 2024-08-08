//Locales types
export const LocaleEn = 'en' as const;
export const LocaleRu = 'ru' as const;

export const SUPPORT_LOCALES = [LocaleEn, LocaleRu];
export type TLocalesLang = (typeof SUPPORT_LOCALES)[number];

// Default
export const DEFAULT_LANG: typeof LocaleEn = LocaleEn;

//Predicates
export const isSupportLocaleType = (v: string): v is TLocalesLang =>
  SUPPORT_LOCALES.includes(v as TLocalesLang);
