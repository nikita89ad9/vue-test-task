import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { tagsRoutes } from './tags.routes';
import type {
  ITagDTOCreateReq,
  ITagDTOCreateResp,
  ITagDTOUpdateReq,
  ITagDTOUpdateResp,
  ITagsDTO,
} from './tags.types';

export const tagsService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<ITagsDTO>(tagsRoutes.getAll(), {
      params,
    }),
  create: (name: ITagDTOCreateReq) =>
    httpRequest().post<ITagDTOCreateResp>(tagsRoutes.create(), name),
  deleteSome: (IDs: string[]) => httpRequest().delete<boolean>(tagsRoutes.deleteSome(), IDs),
  updateByID: (id: string, tagUpdateData: ITagDTOUpdateReq) =>
    httpRequest().patch<ITagDTOUpdateResp>(tagsRoutes.updateByID(id), tagUpdateData),
  deleteByID: (id: string) => httpRequest().delete<boolean>(tagsRoutes.deleteByID(id)),
};
