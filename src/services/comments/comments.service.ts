import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { commentsRoutes } from './comments.routes';
import type {
  ICommentDTO,
  ICommentDTOCreateReq,
  ICommentDTOCreateResp,
  ICommentDTOUpdateReq,
  ICommentDTOUpdateResp,
  ICommentsDTO,
} from './comments.types';

export const commentsService = {
  getAll: (params: QueryParams, articleID: string) =>
    httpRequest().get<ICommentsDTO>(commentsRoutes.getAll(articleID), {
      params,
    }),
  create: (commentCreateData: ICommentDTOCreateReq) =>
    httpRequest().post<ICommentDTOCreateResp>(commentsRoutes.create(), commentCreateData),
  getByID: (id: string) => httpRequest().get<ICommentDTO>(commentsRoutes.getByID(id)),
  update: (id: string, commentUpdateData: ICommentDTOUpdateReq) =>
    httpRequest().patch<ICommentDTOUpdateResp>(commentsRoutes.update(id), commentUpdateData),
  delete: (id: string) => httpRequest().delete<boolean>(commentsRoutes.delete(id)),
};
