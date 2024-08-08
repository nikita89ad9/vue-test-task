import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { sectionsRoutes } from './sections.routes';
import type { ISectionDTOCreateReq, ISectionDTOCreateResp, ISectionsDTO } from './sections.types';

export const sectionsService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<ISectionsDTO>(sectionsRoutes.getSections(), { params }),
  create: (section: ISectionDTOCreateReq) =>
    httpRequest('multipart/form-data').post<ISectionDTOCreateResp>(
      sectionsRoutes.createSection(),
      section
    ),
  getByID: (id: string) => httpRequest().get<boolean>(sectionsRoutes.getByID(id)),
  updateByID: (id: string, section: ISectionDTOCreateReq) =>
    httpRequest('multipart/form-data').patch<boolean>(sectionsRoutes.updateByID(id), section),
  deleteByID: (id: string) => httpRequest().delete<boolean>(sectionsRoutes.deleteByID(id)),
};
