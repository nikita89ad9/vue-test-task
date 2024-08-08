//Item dynamic form
import type { Id } from '@utils/object';
import { UIUniqid } from '@utils/UIUniqid';

const formItemPrefix = 'item_form';

export type TFormItemKey = `${typeof formItemPrefix}_${string}`;

export function createUniqIdFormItem(id?: Id): TFormItemKey {
  return `${formItemPrefix}_${id || UIUniqid()}`;
}

export function getUniqIdFormItem(v: Id): TFormItemKey {
  return `${formItemPrefix}_${v}`;
}
