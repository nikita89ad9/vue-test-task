import type { IBaseFormComponentsProps, TFormItem } from '@components/Form/types';
import { useCreateFormItem } from '@composables/form/useCreateFormItem';
import { injectForm } from '@composables/form/useProvideForm';

export const useForm = <T extends TFormItem>(props: IBaseFormComponentsProps, type: T['type']) => {
  const createCallback = injectForm();

  return useCreateFormItem<T>(createCallback, props, type);
};
