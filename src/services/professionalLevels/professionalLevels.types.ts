export interface IProfessionalLevelDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type IProfessionalLevelsDTO = [IProfessionalLevelDTO[], number];

export interface IProfessionalLevelDTOCreateReq {
  name: string;
}

export type IProfessionalLevelDTOUpdateReq = IProfessionalLevelDTOCreateReq;

export type IProfessionalLevelDTOCreateResp = IProfessionalLevelDTO;

export type IProfessionalLevelDTOUpdateResp = IProfessionalLevelDTO;
