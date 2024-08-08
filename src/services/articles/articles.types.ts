export interface IArticleDTO {
  author: {
    createdAt: string;
    department: string | null;
    email: string;
    id: string;
    jobTitle: null | string;
    name: null | string;
    professionalLevel: string | null;
    roles: string[];
    surname: string | null;
    updatedAt: string;
  };
  authorId: string;
  content: string;
  createdAt: string;
  description: string;
  id: string;
  isPublished: true;
  preview: {
    createdAt: string;
    id: string;
    mediaRemoteUrl: string | null;
    mediaUrl: string;
    originalName: string;
    updatedAt: string;
  };
  previewId: string;
  sectionId: string;
  tags: { id: string; name: string }[];
  title: string;
  updatedAt: string;
}

export type IArticlesDTO = [IArticleDTO[], number];

export type IArticleDTOCreateReq = FormData;

export type IArticleDTOCreateResp = IArticleDTO;

export type IArticleDTOUpdateReq = Omit<IArticleDTOCreateReq, 'authorId'>;

export type IArticleDTOUpdateResp = IArticleDTO;
