import type { IAuthDTO } from '@/services/auth/auth.types';
import type { IUserCreateDTOReq, IUserUpdateDTOReq } from '@/services/user/user.types';

export type IUser = IAuthDTO;
export type IUserCreateData = IUserCreateDTOReq;
export type IUserUpdate = IUserUpdateDTOReq;
