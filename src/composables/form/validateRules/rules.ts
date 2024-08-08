import type { TRuleInputCallback } from '@components/Form/types';
import { UIUniqid } from '@utils/UIUniqid';

import { i18Instance } from '@/i18n';

const commonRules = {
  limit: (value: string, limit: number) => {
    if (value.length < limit) return false;

    return i18Instance.global.t('auth.lengthErr');
  },
};
export const emailRules: TRuleInputCallback[] = [
  (value: string) => commonRules.limit(value, 40),
  (value: string) => {
    if (value) return false;

    return i18Instance.global.t('auth.noEmail');
  },
  (value: string) => {
    if (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)) return false;

    return i18Instance.global.t('auth.invalidEmail');
  },
];
export const passwordRules: TRuleInputCallback[] = [
  (value: string) => commonRules.limit(value, 40),
  (value: string) => {
    if (value) return false;

    return i18Instance.global.t('auth.noPass');
  },
  (value: string) => {
    if (value.length > 6) return false;

    return i18Instance.global.t('auth.invalidPass');
  },
];

export const INPUT_PASSWORD_SIGN_UP_ID = UIUniqid();
export const confirmationPassword: TRuleInputCallback[] = [
  (value: string, getFormItemValueById) => {
    const passwordValue = getFormItemValueById(INPUT_PASSWORD_SIGN_UP_ID);

    if (value !== passwordValue) {
      return 'Password mismatch';
    }

    return false;
  },
];
