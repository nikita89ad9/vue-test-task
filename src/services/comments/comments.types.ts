export interface ICommentDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  userId: string;
  parentArticleId: string;
  parentCommentId: null | string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    surname: string;
    roles: string[];
  };
  parentArticle: {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    isPublished: boolean;
    title: string;
    description: string;
    authorId: string;
    previewId: string;
    sectionId: string;
  };
  parentComment: null;
}

export type ICommentsDTO = [ICommentDTO[], number];

export interface ICommentDTOCreateReq {
  content: string;
  parentArticleId: string;
  parentCommentId: null | string;
  userId: string;
}

export type ICommentDTOCreateResp = ICommentDTO;

export interface ICommentDTOUpdateReq {
  content: string;
}

export type ICommentDTOUpdateResp = ICommentDTO;
