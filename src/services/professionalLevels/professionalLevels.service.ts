import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { professionalLevelsRoutes } from './professionalLevels.routes';
import type {
  IProfessionalLevelDTOCreateReq,
  IProfessionalLevelDTOCreateResp,
  IProfessionalLevelDTOUpdateReq,
  IProfessionalLevelDTOUpdateResp,
  IProfessionalLevelsDTO,
} from './professionalLevels.types';

export const professionalLevelsService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IProfessionalLevelsDTO>(professionalLevelsRoutes.getAll(), {
      params,
    }),
  create: (name: IProfessionalLevelDTOCreateReq) =>
    httpRequest().post<IProfessionalLevelDTOCreateResp>(professionalLevelsRoutes.create(), name),
  getByID: (id: string) => httpRequest().get<boolean>(professionalLevelsRoutes.getByID(id)),
  updateByID: (id: string, professionalLevelUpdateData: IProfessionalLevelDTOUpdateReq) =>
    httpRequest().patch<IProfessionalLevelDTOUpdateResp>(
      professionalLevelsRoutes.updateByID(id),
      professionalLevelUpdateData
    ),
  deleteByID: (id: string) =>
    httpRequest().delete<boolean>(professionalLevelsRoutes.deleteByID(id)),
  deleteSome: (IDs: string[]) =>
    httpRequest().delete<boolean>(professionalLevelsRoutes.deleteSome(), IDs),
};
