import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { departmentsRoutes } from './departments.routes';
import type {
  IDepartmentDTOCreateReq,
  IDepartmentDTOCreateResp,
  IDepartmentDTOUpdateReq,
  IDepartmentDTOUpdateResp,
  IDepartmentsDTO,
} from './departments.types';

export const departmentsService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IDepartmentsDTO>(departmentsRoutes.getAll(), {
      params,
    }),
  create: (name: IDepartmentDTOCreateReq) =>
    httpRequest().post<IDepartmentDTOCreateResp>(departmentsRoutes.create(), name),
  getByID: (id: string) => httpRequest().get<boolean>(departmentsRoutes.getByID(id)),
  updateByID: (id: string, departmentUpdateData: IDepartmentDTOUpdateReq) =>
    httpRequest().patch<IDepartmentDTOUpdateResp>(
      departmentsRoutes.updateByID(id),
      departmentUpdateData
    ),
  deleteByID: (id: string) => httpRequest().delete<boolean>(departmentsRoutes.deleteByID(id)),
  deleteSome: (IDs: string[]) => httpRequest().delete<boolean>(departmentsRoutes.deleteSome(), IDs),
};
