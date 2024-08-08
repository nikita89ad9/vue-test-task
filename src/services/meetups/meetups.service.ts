import { httpRequest } from '@/api';
import type { QueryParams } from '@/types/QueryParams';
import { meetupsRoutes } from './meetups.routes';
import type {
  IMeetupDTO,
  IMeetupDTOCreateReq,
  IMeetupDTOCreateRes,
  IMeetupDTOUpdateReq,
  IMeetupDTOUpdateRes,
  IMeetupsDTO,
} from './meetups.types';

export const meetupsService = {
  getAll: (params?: QueryParams) =>
    httpRequest().get<IMeetupsDTO>(meetupsRoutes.getAll(), {
      params,
    }),
  create: (meetupCreateData: IMeetupDTOCreateReq) =>
    httpRequest('multipart/form-data').post<IMeetupDTOCreateRes>(
      meetupsRoutes.create(),
      meetupCreateData
    ),
  getByID: (id: string) => httpRequest().get<IMeetupDTO>(meetupsRoutes.getByID(id)),
  update: (id: string, meetupUpdateData: IMeetupDTOUpdateReq) =>
    httpRequest('multipart/form-data').patch<IMeetupDTOUpdateRes>(
      meetupsRoutes.update(id),
      meetupUpdateData
    ),
  delete: (id: string) => httpRequest().delete<boolean>(meetupsRoutes.delete(id)),
};
