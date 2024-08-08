import { inject, provide } from 'vue';

import type { TReturnCreateForm } from '@composables/form/useCreateForm';

const INJECTION_FORM_KEY = 'injection__form_key';

export const provideForm = (dynamicForm: TReturnCreateForm) => {
  provide(INJECTION_FORM_KEY, dynamicForm);
};

export const injectForm = (): TReturnCreateForm => {
  return inject(INJECTION_FORM_KEY) as TReturnCreateForm;
};
