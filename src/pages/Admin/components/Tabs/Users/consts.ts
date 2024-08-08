import type { ProfileUpdateForm } from '@/pages/Profile/types';
import type { IUserCreateDTOReq, IUserUpdateDTOReq } from '@/services/user/user.types';

import { i18Instance } from '@/i18n';

export const userCreateForm = (props: IUserCreateDTOReq): ProfileUpdateForm[] => [
  {
    placeholder: i18Instance.global.t('admin.forms.create.name'),
    model: props.name,
    modelKey: 'name',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.create.surname'),
    model: props.surname,
    modelKey: 'surname',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.create.email'),
    model: props.email,
    modelKey: 'email',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.create.department'),
    model: props.department,
    modelKey: 'department',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.create.password'),
    model: props.password,
    modelKey: 'password',
  },
];

export const userUpdateForm = (props: IUserUpdateDTOReq): ProfileUpdateForm[] => [
  {
    placeholder: i18Instance.global.t('admin.forms.update.name'),
    model: props.name,
    modelKey: 'name',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.update.surname'),
    model: props.surname,
    modelKey: 'surname',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.update.department'),
    model: props.department,
    modelKey: 'department',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.update.jobTitle'),
    model: props.jobTitle,
    modelKey: 'jobTitle',
  },
  {
    placeholder: i18Instance.global.t('admin.forms.update.professionalLevel'),
    model: props.professionalLevel,
    modelKey: 'professionalLevel',
  },
];
