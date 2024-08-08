import { computed } from 'vue';

import type { ISettingsSideBarLink } from './types';

import { i18Instance } from '@/i18n';

export const sideBarLinks = computed<ISettingsSideBarLink[]>(() => [
  {
    name: i18Instance.global.t('settings.account'),
    route: 'account',
  },
  {
    name: i18Instance.global.t('settings.notifications'),
    route: 'notifications',
  },
  {
    name: i18Instance.global.t('settings.appearance'),
    route: 'appearance',
  },
]);

export const notificationSettingsHeaders = computed(() => [
  {
    disabled: false,
    name: i18Instance.global.t('settings.notificationSettings.publicComments'),
    modelValue: false,
  },
  {
    disabled: false,
    name: i18Instance.global.t('settings.notificationSettings.favComments'),
    modelValue: false,
  },
  {
    disabled: false,
    name: i18Instance.global.t('settings.notificationSettings.commentReplies'),
    modelValue: false,
  },
  {
    disabled: false,
    name: i18Instance.global.t('settings.notificationSettings.newMsg'),
    modelValue: false,
  },
  {
    disabled: false,
    name: i18Instance.global.t('settings.notificationSettings.webUpdates'),
    modelValue: false,
  },
]);

export const appearanceSettingsHeaders = computed(() => [
  {
    name: i18Instance.global.t('settings.appearanceSettings.dark'),
    value: 'dark',
  },
  {
    name: i18Instance.global.t('settings.appearanceSettings.light'),
    value: 'light',
  },
  {
    name: i18Instance.global.t('settings.appearanceSettings.default'),
    value: 'system',
  },
]);
