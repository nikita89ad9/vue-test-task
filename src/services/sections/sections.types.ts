export interface ISectionDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  name: string;
  preview: {
    mediaUrl: string;
    mediaRemoteUrl: null | string;
    originalName: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  sectionStats: {
    sectionId: string;
    articlesCount: number;
    popularTags: string[];
  };
}

export type ISectionsDTO = [ISectionDTO[], number];

export type ISectionDTOCreateReq = FormData;

export type ISectionDTOCreateResp = ISectionDTO;
