export interface IMediaDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  mediaUrl: string;
  originalName: string;
}

export type IMediasDTO = IMediaDTO[];

export type IMediaDTOCreateReq = FormData;

export type IMediaDTOCreateResp = IMediaDTO;
