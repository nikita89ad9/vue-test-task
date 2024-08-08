import type { IAuthAvatar, IAuthDTO } from '../auth/auth.types';

export type IUserDTO = IAuthDTO;

export type IUserPublicDTO = Omit<IUserDTO, 'password' | 'roles' | 'createdAt' | 'updatedAt'>;

export type IUsersDTO = [IAuthDTO[], number];

export interface IUserCreateDTOReq {
  email: string;
  password: string;
  name: string;
  surname: string;
  department: string;
}

export type IUserCreateDTORes = IAuthDTO;

export interface IUserUpdateDTOReq {
  name?: string;
  surname?: string;
  department?: string;
  professionalLevel?: string;
  jobTitle?: string;
  avatarUrl?: IAuthAvatar;
}

export type IUserUpdateDTORes = IAuthDTO;
