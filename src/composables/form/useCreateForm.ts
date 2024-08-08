import { computed, type DeepReadonly, reactive, readonly, type UnwrapNestedRefs } from 'vue';

import type { TFormItem, TFormItems } from '@components/Form/types';
import type { TFormItemKey } from '@composables/form/types';
import { getEmptyFormItemByType } from '@composables/form/useCreateFormItem';

export type TReturnCreateForm = ReturnType<typeof useCreateForm>['create'];

export const useCreateForm = () => {
  const form = reactive<TFormItems>(new Map<TFormItemKey, TFormItem>());

  const get = <F extends TFormItem = TFormItem>(formItemKey: TFormItemKey): F | null => {
    const formItem = (form.get(formItemKey) as F) || null;

    if (!formItem) {
      return null;
    }

    return formItem;
  };

  const hasFormItem = (formItemKey: TFormItemKey): boolean => {
    return form.has(formItemKey);
  };

  const validateFields = () => {
    form.forEach((el: TFormItem) => {
      el.validation();
    });
  };

  const resetFields = () => {
    form.forEach((el: TFormItem) => {
      el.reset();
    });
  };

  const isValid = computed<boolean>(() => {
    for (const [, value] of form.entries()) {
      if ((value.required && value.value === '') || value.error) {
        return false;
      }
    }
    return true;
  });

  const create = <F extends TFormItem>(formItemKey: TFormItemKey, type: F['type']) => {
    const createFormItem = (target: F) => {
      form.set(formItemKey, target);
    };

    const formItem = computed((): DeepReadonly<UnwrapNestedRefs<F>> => {
      const formItem = (form.get(formItemKey) as F) || null;

      if (!formItem) {
        return readonly(getEmptyFormItemByType(type));
      }

      return readonly(formItem);
    });

    const setFormItemByKey = <F extends TFormItem>(key: keyof F, value: F[keyof F]) => {
      const formItem = get<F>(formItemKey);

      if (!formItem) {
        return void 0;
      }

      formItem[key] = value;
    };

    return {
      createFormItem,
      formItem,
      setFormItemByKey,
      hasFormItem,
      getFormItem: get,
    };
  };

  return { create, validateFields, resetFields, isValid, form };
};
