import type { IMultiselectOptionProps } from '@/components/Multiselect/types';

export interface IAuthor {
  id: number;
  avatar: string;
  name: string;
  position: string;
  description: string;
}

export interface ISelectValue {
  name: string;
  value: string;
}

export interface INavPlaceholders {
  [key: string]: string;
}

export interface IAuthorsModel {
  departmentsValue: IMultiselectOptionProps[];
  jobsValue: IMultiselectOptionProps[];
}
