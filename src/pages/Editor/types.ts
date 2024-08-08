import type { Component } from 'vue';

import type { ITagsSelectProps } from '@/components/TagsSelect/types';
import type { IAuthDTO } from '@/services/auth/auth.types';

export interface ArticleData {
  title: string;
  created: {
    authorName: string;
    date: string | number;
  };
  article: unknown;
  tags: string[];
  metrics: {
    likes: number;
    comments: number;
  };
}

export interface ArticleModel {
  title: string;
  description: string;
  authorId: string;
  sectionId: string;
  preview: File | string;
  tags: ITagsSelectProps[];
}

export interface ArticlePreview extends ArticleModel {
  content: string;
  createdAt: string;
  author: IAuthDTO;
}

export interface SelectedItemTab {
  id: number;
  component: Component;
}
