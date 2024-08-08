export interface IAuthAvatar {
  createdAt: string;
  id: string;
  mediaRemoteUrl: string | null;
  mediaUrl: string;
  originalName: string;
  updatedAt: string;
}

export interface IAuthDTO {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  department: string;
  professionalLevel: string;
  jobTitle: string;
  avatar: IAuthAvatar | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

//Register
export type IAuthRegisterDTOReq = Pick<IAuthDTO, 'email' | 'password'>;

export interface IAuthRegisterDTORes {
  accessToken: string;
}

//Login
export type IAuthLoginDTOReq = IAuthRegisterDTOReq;

export type IAuthLoginDTORes = IAuthRegisterDTORes;

//Info
export type IAuthInfoDTORes = IAuthDTO;

export interface IAuthRefreshDTORes {
  accessToken: string;
  refreshToken: string;
}
