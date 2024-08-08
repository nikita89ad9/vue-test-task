import type { TUIUniqid } from '@utils/UIUniqid';

export interface ISubscription {
  id: TUIUniqid;
  label: string;
  price: number;
}
