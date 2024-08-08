import type { ISectionDTO } from '@/services/sections/sections.types';

import { i18Instance } from '@/i18n';

export const sectionsCreateForm = (props: ISectionDTO) => [
  {
    placeholder: i18Instance.global.t('admin.sectionForm.name'),
    model: props.name,
    modelKey: 'model',
  },
  {
    placeholder: i18Instance.global.t('admin.sectionForm.description'),
    model: props.description,
    modelKey: 'description',
  },
  {
    placeholder: i18Instance.global.t('admin.sectionForm.preview'),
    model: props.preview,
    modelKey: 'preview',
  },
];
