import type { IBaseFormComponentsProps } from '@components/Form/types';
import type { BaseInputProps } from '@common/BaseInput/types';

export const FormInputType = 'form-input' as const;
export type TFormInputType = typeof FormInputType;

export type IFormInputProps = BaseInputProps & IBaseFormComponentsProps;

export interface IFormInput {
  value: string;
  type: TFormInputType;
  error: string | boolean;
  required: boolean;
  validation: () => void;
  reset: () => void;
}
