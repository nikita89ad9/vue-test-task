import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { jobTitlesRoutes } from './jobTitles.routes';
import type {
  IJobTitleDTOCreateReq,
  IJobTitleDTOCreateResp,
  IJobTitleDTOUpdateReq,
  IJobTitleDTOUpdateResp,
  IJobTitlesDTO,
} from './jobTitles.types';

export const jobTitlesService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IJobTitlesDTO>(jobTitlesRoutes.getAll(), {
      params,
    }),
  create: (name: IJobTitleDTOCreateReq) =>
    httpRequest().post<IJobTitleDTOCreateResp>(jobTitlesRoutes.create(), name),
  getByID: (id: string) => httpRequest().get<boolean>(jobTitlesRoutes.getByID(id)),
  updateByID: (id: string, jobTitlesUpdateData: IJobTitleDTOUpdateReq) =>
    httpRequest().patch<IJobTitleDTOUpdateResp>(
      jobTitlesRoutes.updateByID(id),
      jobTitlesUpdateData
    ),
  deleteByID: (id: string) => httpRequest().delete<boolean>(jobTitlesRoutes.deleteByID(id)),
  deleteSome: (IDs: string[]) => httpRequest().delete<boolean>(jobTitlesRoutes.deleteSome(), IDs),
};
