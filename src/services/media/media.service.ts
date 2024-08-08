import { httpRequest } from '@/api';
import { mediaRoutes } from './media.routes';
import type { IMediaDTO, IMediaDTOCreateReq, IMediaDTOCreateResp } from './media.types';

export const mediaService = {
  getByID: (id: string) => httpRequest().get<IMediaDTO>(mediaRoutes.getByID(id)),
  deleteByID: (id: string) => httpRequest().delete<boolean>(mediaRoutes.delete(id)),
  create: (file: IMediaDTOCreateReq) =>
    httpRequest('multipart/form-data').post<IMediaDTOCreateResp>(mediaRoutes.create(), file),
};
