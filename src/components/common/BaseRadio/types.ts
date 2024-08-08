import type { TUIUniqid } from '@/utils/UIUniqid';

export interface IRadioGroup {
  id: TUIUniqid;
  name: string;
}

export interface IRadioGroupProp {
  name: string;
  modelValue: string;
}

export interface IRadioButtonProp {
  id: TUIUniqid;
  value: string;
  checked?: boolean;
}

export interface IProvideSetActiveMethod {
  setActive: (value: string) => void;
}
