import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { userRoutes } from './user.routes';
import type {
  IUserCreateDTOReq,
  IUserCreateDTORes,
  IUserDTO,
  IUsersDTO,
  IUserUpdateDTOReq,
  IUserUpdateDTORes,
} from './user.types';

export const userService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IUsersDTO>(userRoutes.getAll(), {
      params,
    }),
  create: (userData: IUserCreateDTOReq) =>
    httpRequest().post<IUserCreateDTORes>(userRoutes.create(), userData),
  update: (id: string, userData: IUserUpdateDTOReq) =>
    httpRequest('multipart/form-data').patch<IUserUpdateDTORes>(userRoutes.update(id), userData),
  delete: (id: string) => httpRequest().delete<boolean>(userRoutes.delete(id)),
  getById: (id: string) => httpRequest().get<IUserDTO>(userRoutes.getByID(id)),
};
