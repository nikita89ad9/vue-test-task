import type {
  TFormItem,
  TReturnPickBaseFormComponentProps,
  TRuleGetFormItemById,
  TRuleInputCallback,
} from '@components/Form/types';
import { FormInputType } from '@/components/Form/components/FormInput/types';
import { createUniqIdFormItem, getUniqIdFormItem } from '@composables/form/types';
import type { TReturnCreateForm } from '@composables/form/useCreateForm';
import { validateFormItemRules } from '@composables/form/validateRules';
import { constVoid, isTypeId, notNullable } from '@utils/function';
import type { Id } from '@utils/object';

export const useCreateFormItem = <F extends TFormItem>(
  create: TReturnCreateForm,
  props: TReturnPickBaseFormComponentProps,
  type: F['type']
) => {
  //Init methods form item
  const { setFormItemByKey, formItem } = initFormItem(type, props, create);

  const setFormItemValue = (value: F['value']): void => {
    setFormItemByKey('value', value);
  };

  return {
    setFormItemValue,
    formItem,
  };
};

//initFormItem
const initFormItem = <F extends TFormItem>(
  type: F['type'],
  props: TReturnPickBaseFormComponentProps,
  create: TReturnCreateForm
) => {
  // Create component key
  const componentKey = createUniqIdFormItem(isTypeId(props.id) ? props.id : undefined);

  const { createFormItem, formItem, setFormItemByKey, hasFormItem, getFormItem } = create<F>(
    componentKey,
    type
  );

  // Get empty instance of form item and create in state
  const newFormItem = getEmptyFormItemByType<F>(type);

  if (!hasFormItem(componentKey) && notNullable(newFormItem)) {
    createFormItem(newFormItem);
  } else {
    console.error('Failed to create Form Item');
  }

  const initValidator = (rules: TRuleInputCallback[]) => {
    const validate = () => {
      const getFormItemById: TRuleGetFormItemById = (id: Id) =>
        getFormItem(getUniqIdFormItem(id))?.value || null;

      setFormItemByKey(
        'error',
        validateFormItemRules<F>(rules, formItem.value.value, getFormItemById)
      );
    };

    setFormItemByKey('validation', validate);
  };
  const initReset = () => {
    const item = getEmptyFormItemByType<F>(type);
    const reset = () => {
      setFormItemByKey('value', item.value);
      setFormItemByKey('error', item.error);
    };

    setFormItemByKey('reset', reset);
  };

  //Init reset and validations methods
  initReset();

  if (Array.isArray(props.rules) && props.rules.length) {
    initValidator(props.rules);
  }
  setFormItemByKey('required', props.required || false);

  return {
    createFormItem,
    formItem,
    setFormItemByKey,
    hasFormItem,
    componentKey,
  };
};

export const getEmptyFormItemByType = <F extends TFormItem>(type: TFormItem['type']): F => {
  switch (type) {
    case 'form-input':
      return getEmptyFormInputItem();
  }
};

const getEmptyFormInputItem = <F extends TFormItem>(): F => {
  return {
    type: FormInputType,
    value: '',
    error: '',
    required: false,
    validation: constVoid,
    reset: constVoid,
  } as F;
};
