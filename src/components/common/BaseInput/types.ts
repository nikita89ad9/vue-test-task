export type HTMLInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'url'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden'
  | 'image'
  | 'range'
  | 'search'
  | 'tel';

export type InputVariant = 'contained' | 'outlined';

export interface BaseInputProps {
  name?: string;
  modelValue?: string | number | boolean | Date;
  type?: HTMLInputType;
  placeholder?: string;
  label?: string;
  variant?: InputVariant;
  error?: string | boolean;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  clearable?: boolean;
}
