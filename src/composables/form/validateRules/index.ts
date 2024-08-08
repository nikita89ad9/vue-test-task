import type { TFormItem, TRuleGetFormItemById, TRuleInputCallback } from '@components/Form/types';
import { isBoolean, isString } from '@/types/predicates';

export const validateFormItemRules = <F extends TFormItem>(
  rules: readonly TRuleInputCallback[],
  value: F['value'],
  getFormItem: TRuleGetFormItemById
): boolean | string => {
  for (const rule of rules) {
    const r = rule(value, getFormItem);

    if (r && (isString(r) || isBoolean(r))) {
      return r;
    }
  }

  return false;
};
