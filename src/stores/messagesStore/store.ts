import type { AxiosError } from 'axios';
import { defineStore, storeToRefs } from 'pinia';

import { computed, ref } from 'vue';

import type {
  IDialogCreateDTOReq,
  IDialogCreateDTOResp,
  IDialogDeleteDTOReq,
  IWssDeleteMessagesDTOReq,
  IWssGetDialogDTOReq,
  IWssGetDialogMessagesDTOReq,
  IWssGetDialogsDTOReq,
  IWssGetMessageDTOResp,
  IWssGetMessagesDTOResp,
  IWssSendMessageDTOReq,
} from '@services/dialogs/dialogs.types';
import { dialogEmit, dialogListen, dialogsService } from '@/services/dialogs/dialogs.service';
import { userService } from '@/services/user/user.service';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';
import type { IUser } from '../admin/usersStore/model';
import { useUserStore } from '../userStore/store';

export const useMessagesStore = defineStore('messages store', () => {
  const { user } = storeToRefs(useUserStore());

  let timer: ReturnType<typeof setTimeout>;

  const dialogsList = ref<{
    amount: number;
    dialogs: IDialogCreateDTOResp[] | null;
  }>({
    amount: 0,
    dialogs: null,
  });

  const messengerUsersList = ref<IUser[]>([]);

  const currentDialogsPage = ref<number>(1);
  const currentDialogData = ref<IDialogCreateDTOResp>();
  const currentDialogMessages = ref<IWssGetMessagesDTOResp>([]);
  const currentDialogMessagesAmount = ref<number>(0);
  const messageSendingStatus = ref<boolean>(false);
  const sendingMessage = ref<string>('');

  const isMessageSendPending = computed<boolean>(() => messageSendingStatus.value);

  const startNewDialog = async (
    companionId: string,
    isGroup: boolean = false,
    name: string = 'dialog'
  ) => {
    const dialogData: IDialogCreateDTOReq = {
      creatorId: user.value!.id,
      name,
      isGroup,
      usersIds: [user.value!.id, companionId],
    };

    try {
      await dialogsService.startNewDialog(dialogData);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteDialog = async (dialogId: string) => {
    const deleteData: IDialogDeleteDTOReq = {
      dialogId,
      userId: user.value!.id,
    };

    try {
      await dialogsService.deleteDialog(deleteData);
      getDialogsList(0);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const getMessengerUsersList = async (search: string, page: string | number) => {
    const params: QueryParams = {
      limit: 20,
      page: Number(page) - 1,
      search,
    };

    const resp = await userService.getAll(params);
    messengerUsersList.value = resp[0];
  };

  const getDialogsList = (page: number) => {
    if (!user.value) return;

    const dialogsData: IWssGetDialogsDTOReq = {
      userId: user.value.id,
      page: page,
      limit: 20,
    };

    try {
      dialogEmit.getDialogsList(dialogsData);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const getDialogData = (dialogId: string) => {
    if (!user.value) return;

    const dialogData: IWssGetDialogDTOReq = {
      userId: user.value.id,
      dialogId,
    };

    try {
      dialogEmit.getDialogData(dialogData);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const getDialogMessages = (page: number) => {
    if (!user.value || !currentDialogData.value) return;

    const messagesData: IWssGetDialogMessagesDTOReq = {
      dialogId: currentDialogData.value.id,
      limit: 50,
      page,
      userId: user.value.id,
    };

    try {
      dialogEmit.getDialogMessages(messagesData);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const messageSendCountdown = () => {
    timer = setTimeout(() => {
      messageSendingStatus.value = false;
      sendingMessage.value = '';

      catchError(new Error('Failed to send message'));
    }, 10000);
  };

  const sendMessage = (messageText: string, files?: FormData[]) => {
    if (!currentDialogData.value || !user.value) return;

    const messageData: IWssSendMessageDTOReq = {
      dialogId: currentDialogData.value.id,
      senderId: user.value.id,
      text: messageText,
      files: files,
    };

    try {
      sendingMessage.value = messageText;
      messageSendingStatus.value = true;
      dialogEmit.sendMessage(messageData);
      messageSendCountdown();
    } catch (error) {
      catchError(error as AxiosError);
      messageSendingStatus.value = false;
    }
  };

  const refreshChatLastMessage = (messageData: IWssGetMessageDTOResp) => {
    if (!dialogsList.value.dialogs) return;

    const chatElement = dialogsList.value.dialogs.find(el => el.id === messageData.dialogId);
    if (chatElement) chatElement.lastMessage.text = messageData.text;
  };

  const deleteMessage = (messageId: string) => {
    if (!currentDialogData.value || !user.value) return;

    const deleteMessageData: IWssDeleteMessagesDTOReq = {
      dialogId: currentDialogData.value.id,
      messagesIds: [messageId],
      toUserId: currentDialogData.value.users.find(companion => user.value!.id !== companion.id)!
        .id,
    };
    try {
      dialogEmit.deleteMessages(deleteMessageData);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const listenWSSDialogEmits = () => {
    dialogListen.onDialogsListReceived(data => {
      dialogsList.value.amount = data[1];
      dialogsList.value.dialogs = data[0];
    });

    dialogListen.onDialogDataReceived(data => {
      currentDialogData.value = data;
      getDialogMessages(0);
    });

    dialogListen.onMessageReceived(data => {
      if (!user.value || data.message.senderId === user.value.id) return;
      if (!dialogsList.value.dialogs) return;

      if (data.message.dialogId === currentDialogData.value?.id) {
        currentDialogMessages.value.push(data.message);
      }

      refreshChatLastMessage(data.message);
    });

    dialogListen.onMessageReturned(data => {
      if (!dialogsList.value.dialogs) return;
      if (data.message.dialogId === currentDialogData.value?.id) {
        currentDialogMessages.value.push(data.message);
      }

      refreshChatLastMessage(data.message);
      messageSendingStatus.value = false;
      clearTimeout(timer);
    });

    dialogListen.onDialogMessagesReceived(data => {
      if (!currentDialogData.value) return;

      currentDialogMessages.value = data.messages[0];
      currentDialogMessagesAmount.value = data.messages[1];
    });

    dialogListen.onDeletedMessagesReceived(data => {
      const messagesToDelete = new Set(data.messagesIds);

      currentDialogMessages.value = currentDialogMessages.value.filter(
        message => !messagesToDelete.has(message.id)
      );

      return data;
    });
  };

  return {
    messengerUsersList,
    dialogsList,
    currentDialogData,
    currentDialogMessages,
    currentDialogsPage,
    isMessageSendPending,
    sendingMessage,
    getMessengerUsersList,
    startNewDialog,
    getDialogsList,
    getDialogData,
    getDialogMessages,
    sendMessage,
    deleteMessage,
    listenWSSDialogEmits,
    deleteDialog,
  };
});
