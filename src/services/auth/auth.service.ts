import { httpRequest } from '@/api';
import { authRoutes } from './auth.routes';
import type {
  IAuthInfoDTORes,
  IAuthLoginDTOReq,
  IAuthLoginDTORes,
  IAuthRefreshDTORes,
  IAuthRegisterDTOReq,
  IAuthRegisterDTORes,
} from './auth.types';

export const authService = {
  googleAuth: () => (window.location.href = authRoutes.googleAuth()),
  login: (authData: IAuthLoginDTOReq) =>
    httpRequest().post<IAuthLoginDTORes>(authRoutes.login(), authData),

  register: (authData: IAuthRegisterDTOReq) =>
    httpRequest().post<IAuthRegisterDTORes>(authRoutes.register(), authData),

  logout: () => httpRequest().post(authRoutes.logout()),

  refresh: () => httpRequest().post<IAuthRefreshDTORes>(authRoutes.refresh()),

  info: () => httpRequest().get<IAuthInfoDTORes>(authRoutes.info()),
};
