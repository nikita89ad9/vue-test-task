import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { articlesRoutes } from './articles.routes';
import type {
  IArticleDTO,
  IArticleDTOCreateReq,
  IArticleDTOCreateResp,
  IArticleDTOUpdateReq,
  IArticleDTOUpdateResp,
  IArticlesDTO,
} from './articles.types';

export const articlesService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IArticlesDTO>(articlesRoutes.getAll(), {
      params,
    }),
  create: (articleCreateData: IArticleDTOCreateReq) =>
    httpRequest('multipart/form-data').post<IArticleDTOCreateResp>(
      articlesRoutes.create(),
      articleCreateData
    ),
  getByID: (id: string) => httpRequest().get<IArticleDTO>(articlesRoutes.getByID(id)),
  update: (id: string, articleUpdateData: IArticleDTOUpdateReq) =>
    httpRequest().patch<IArticleDTOUpdateResp>(articlesRoutes.update(id), articleUpdateData),
  delete: (id: string) => httpRequest().delete<boolean>(articlesRoutes.delete(id)),
};
