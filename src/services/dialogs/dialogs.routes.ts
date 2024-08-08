import type { IDialogDeleteDTOReq } from './dialogs.types';

const DIALOGS_PATH = '/dialogs';

export const dialogsRoutes = {
  startNew: () => `${DIALOGS_PATH}`,
  deleteDialog: (deleteData: IDialogDeleteDTOReq) =>
    `${DIALOGS_PATH}/${deleteData.userId}/${deleteData.dialogId}`,
};
