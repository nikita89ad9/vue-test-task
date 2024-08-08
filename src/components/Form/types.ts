import type { IFormInput } from '@components/Form/components/FormInput/types';
import type { TFormItemKey } from '@composables/form/types';
import type { Id } from '@utils/object';

//Types components FORM
export type TFormItem = IFormInput;

export type TFormItems = Map<TFormItemKey, TFormItem>;

//RULES
export type TRuleGetFormItemById = <F extends TFormItem = TFormItem>(id: Id) => F['value'] | null;

export type TRuleInputCallback = <F extends TFormItem>(
  value: F['value'],
  getFormItemValueById: TRuleGetFormItemById
) => string | boolean;

//Base props form interface that should extend main props interface of form components
export interface IBaseFormComponentsProps {
  required?: boolean;
  rules?: TRuleInputCallback[];
  id?: Id;
}

export const PickBaseFormComponentProps = <T extends IBaseFormComponentsProps>({
  required,
  rules,
  id,
}: T): Pick<T, keyof IBaseFormComponentsProps> => {
  return { id, rules, required };
};

export type TReturnPickBaseFormComponentProps = ReturnType<typeof PickBaseFormComponentProps>;
