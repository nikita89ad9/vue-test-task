import type { ITagDTO } from '../tags/tags.types';

export interface IMeetupDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  participants: string;
  isPublished: string;
  title: string;
  tags: ITagDTO[];
  description: string;
  preview: {
    id: string;
    originalName: string;
    mediaUrl: string;
  };
  authorId: string;
  sectionId: string;
  author: {
    id: string;
    email: string;
    name: string;
    surname: string;
    department: string;
    professionalLevel: string;
    jobTitle: string;
    avatar: {
      mediaUrl: string;
      originalName: string;
    };
  };
  section: {
    name: string;
  };
}

export type IMeetupDTOCreateReq = FormData;

export type IMeetupDTOCreateRes = IMeetupDTO;

export type IMeetupDTOUpdateReq = FormData;

export type IMeetupDTOUpdateRes = IMeetupDTO;

export type IMeetupsDTO = [IMeetupDTO[], number];
