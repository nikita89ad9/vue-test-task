import type { IUser } from '@/stores/admin/usersStore/model';
import type { IUserPublicDTO } from '../user/user.types';

export interface IDialogDTO {
  name: string;
  isGroup: boolean;
  creator: IUserPublicDTO;
  users: IUserPublicDTO[];
  messages: null;
}

export interface IDialogAttachmentDTO {
  id: string;
  mediaUrl: string;
  originalName: string;
}

export interface IDialogCreateDTOReq {
  name: string;
  isGroup: boolean;
  creatorId: string;
  usersIds: string[];
}

export interface IDialogDeleteDTOReq {
  dialogId: string;
  userId: string;
}

export interface IDialogCreateDTOResp {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  isGroup: boolean;
  creator: IUserPublicDTO;
  creatorId: string;
  lastMessage: {
    articleId: string | null;
    createdAt: string;
    dialogId: string;
    id: string;
    senderId: string | null;
    text: string;
    updatedAt: string;
  };
  users: IUserPublicDTO[];
  participants: IUserPublicDTO[];
}

export interface IWssGetMessageDTOResp {
  article: null;
  articleId: string;
  attachments: null[];
  createdAt: string;
  dialog: Omit<IWssDialogDTOResp, 'users'>;
  dialogId: string;
  id: string;
  sender: IUserPublicDTO;
  senderId: string;
  text: string;
  updatedAt: string;
}

export type IWssGetMessagesDTOResp = IWssGetMessageDTOResp[];

export interface IWssDialogDTOResp {
  id: string;
  createdAt: string;
  creatorId: string;
  updatedAt: string;
  name: string;
  isGroup: boolean;
  users: Omit<IUser, 'avatarUrl' | 'password'>[];
}

export interface IWssGetDialogsDTOReq {
  userId: string;
  page: number;
  limit: number;
  orederBy?: 'createdAt';
  sortOrder?: 'desc';
}

export interface IWssGetDialogDTOReq {
  dialogId: string;
  userId: string;
}

export interface IWssSendMessageDTOReq {
  text: string;
  dialogId: string;
  senderId: string;
  files?: FormData[];
}

export interface IWssGetDialogMessagesDTOReq {
  dialogId: string;
  page: number;
  limit: number;
  orderBy?: 'createdAt';
  sortOrder?: 'desc';
  userId: string;
}

export interface IWssDeleteMessagesDTOReq {
  messagesIds: string[];
  dialogId: string;
  toUserId: string;
}
