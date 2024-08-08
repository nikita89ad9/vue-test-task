import type { IUserUpdateDTOReq } from '@/services/user/user.types';
import type { ProfileUpdateForm } from './types';

import { i18Instance } from '@/i18n';

export const profileUpdateForm = (props: IUserUpdateDTOReq): ProfileUpdateForm[] => [
  {
    placeholder: i18Instance.global.t('profile.update.name'),
    model: props.name,
    modelKey: 'name',
  },
  {
    placeholder: i18Instance.global.t('profile.update.surname'),
    model: props.surname,
    modelKey: 'surname',
  },
  {
    placeholder: i18Instance.global.t('profile.update.department'),
    model: props.department,
    modelKey: 'department',
  },
  {
    placeholder: i18Instance.global.t('profile.update.jobTitle'),
    model: props.jobTitle,
    modelKey: 'jobTitle',
  },
  {
    placeholder: i18Instance.global.t('profile.update.professionalLevel'),
    model: props.professionalLevel,
    modelKey: 'professionalLevel',
  },
];
