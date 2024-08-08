import { httpRequest } from '@/api';
import { wssService } from '@/api/websocket';
import { DialogClientEvent, DialogServerEvent } from './dialog.events';
import { dialogsRoutes } from './dialogs.routes';
import type {
  IDialogCreateDTOReq,
  IDialogCreateDTOResp,
  IDialogDeleteDTOReq,
} from './dialogs.types';
import type {
  IWssDeleteMessagesDTOReq,
  IWssGetDialogDTOReq,
  IWssGetDialogMessagesDTOReq,
  IWssGetDialogsDTOReq,
  IWssGetMessageDTOResp,
  IWssGetMessagesDTOResp,
  IWssSendMessageDTOReq,
} from './dialogs.types';

export const dialogsService = {
  startNewDialog: (dialogData: IDialogCreateDTOReq) =>
    httpRequest().post<IDialogCreateDTOResp>(dialogsRoutes.startNew(), dialogData),

  deleteDialog: (deleteData: IDialogDeleteDTOReq) =>
    httpRequest().delete(dialogsRoutes.deleteDialog(deleteData)),
};

export const dialogEmit = {
  getDialogsList: (dialogsData: IWssGetDialogsDTOReq) => {
    wssService.emit(DialogServerEvent.CLIENT_GET_DIALOGS, {
      userId: dialogsData.userId,
      filters: {
        limit: dialogsData.limit,
        page: dialogsData.page,
        sortOrder: dialogsData.sortOrder,
        orederBy: dialogsData.orederBy,
      },
    });
  },

  getDialogData: (dialogData: IWssGetDialogDTOReq) => {
    wssService.emit(DialogServerEvent.CLIENT_GET_DIALOG, {
      dialogId: dialogData.dialogId,
      auth: {
        id: dialogData.userId,
      },
    });
  },

  getDialogMessages: (dialogData: IWssGetDialogMessagesDTOReq) => {
    wssService.emit(DialogServerEvent.CLIENT_GET_DIALOG_MESSAGES, {
      dialogId: dialogData.dialogId,
      filters: {
        page: dialogData.page,
        limit: dialogData.limit,
        orderBy: dialogData.orderBy,
        sortOrder: dialogData.sortOrder,
      },
      auth: {
        id: dialogData.userId,
      },
    });
  },

  sendMessage: (messageData: IWssSendMessageDTOReq) => {
    wssService.emit(DialogServerEvent.CLIENT_SEND_MESSAGE, {
      dto: {
        text: messageData.text,
        dialogId: messageData.dialogId,
        senderId: messageData.senderId,
      },
      files: messageData.files,
    });
  },

  deleteMessages: (messagesData: IWssDeleteMessagesDTOReq) => {
    wssService.emit(DialogServerEvent.CLIENT_DELETE_MESSAGES, {
      messagesIds: messagesData.messagesIds,
      dialogId: messagesData.dialogId,
      toUserId: messagesData.toUserId,
    });
  },
};

export const dialogListen = {
  onDialogsListReceived: (callback: (data: [IDialogCreateDTOResp[], number]) => void) =>
    wssService.on(DialogClientEvent.SERVER_SENDS_DIALOGS, callback),

  onDialogDataReceived: (callback: (data: IDialogCreateDTOResp) => void) =>
    wssService.on(DialogClientEvent.SERVER_SENDS_DIALOG, callback),

  onMessageReceived: (callback: (data: { message: IWssGetMessageDTOResp }) => void) =>
    wssService.on(DialogClientEvent.SERVER_SENDS_MESSAGE, callback),

  onMessageReturned: (callback: (data: { message: IWssGetMessageDTOResp }) => void) =>
    wssService.on(DialogClientEvent.SERVER_RETURNS_MESSAGE, callback),

  onDialogMessagesReceived: (
    callback: (data: { messages: [IWssGetMessagesDTOResp, number]; dialogId: string }) => void
  ) => wssService.on(DialogClientEvent.SERVER_SENDS_DIALOG_MESSAGES, callback),

  onDeletedMessagesReceived: (
    callback: (data: { messagesIds: string[]; dialogId: string }) => void
  ) => wssService.on(DialogClientEvent.SERVER_SENDS_DELETED_MESSAGES, callback),
};
