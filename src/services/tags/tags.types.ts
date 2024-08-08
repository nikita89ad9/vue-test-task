export interface ITagDTO {
  id: string;
  name: string;
}

export type ITagsDTO = [ITagDTO[], number];

export interface ITagDTOCreateReq {
  name: string;
}

export type ITagDTOUpdateReq = ITagDTOCreateReq;

export type ITagDTOCreateResp = ITagDTO;

export type ITagDTOUpdateResp = ITagDTO;
