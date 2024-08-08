import type { TUIUniqid } from '@/utils/UIUniqid';

export interface ICheckbox {
  id: TUIUniqid;
  disabled?: boolean;
  name: string;
  modelValue: boolean;
}

export interface TCheckboxProp {
  disabled?: boolean;
  name: string;
  modelValue: boolean;
}
