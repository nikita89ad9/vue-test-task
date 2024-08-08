import type { IWssDialogDTOResp } from '@/services/dialogs/dialogs.types';

export interface IDialogList {
  dialogs: IWssDialogDTOResp[];
  dialogsAmount: number;
}
