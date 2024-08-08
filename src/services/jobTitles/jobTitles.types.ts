export interface IJobTitleDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type IJobTitlesDTO = [IJobTitleDTO[], number];

export interface IJobTitleDTOCreateReq {
  name: string;
}

export type IJobTitleDTOUpdateReq = IJobTitleDTOCreateReq;

export type IJobTitleDTOCreateResp = IJobTitleDTO;

export type IJobTitleDTOUpdateResp = IJobTitleDTO;
