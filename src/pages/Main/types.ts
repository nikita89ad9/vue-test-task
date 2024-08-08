import type { IAuthAvatar } from '@/services/auth/auth.types';
import type { ITagDTO } from '@/services/tags/tags.types';

export interface IAuthor {
  id: string;
  avatar: IAuthAvatar | null;
  name: string;
  jobTitle: string;
  description: string;
}

export interface IItem {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  tags: ITagDTO[];
  image: string;
  author: string;
}
