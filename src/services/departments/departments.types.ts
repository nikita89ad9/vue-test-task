export interface IDepartmentDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type IDepartmentsDTO = [IDepartmentDTO[], number];

export interface IDepartmentDTOCreateReq {
  name: string;
}

export type IDepartmentDTOUpdateReq = IDepartmentDTOCreateReq;

export type IDepartmentDTOCreateResp = IDepartmentDTO;

export type IDepartmentDTOUpdateResp = IDepartmentDTO;
