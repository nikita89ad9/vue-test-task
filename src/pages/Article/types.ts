import type { SelectOption } from '@/types/Select';

export interface Image {
  src: string;
  description?: string;
}

export interface MockCreate {
  authorName: string;
  date: string | number;
}

export type MockDataArticle = unknown;

export interface MockMetrics {
  likes: number;
  comments: number;
}

export interface MockData {
  title: string;
  created: MockCreate;
  article: MockDataArticle;
  tags: string[];
  metrics: MockMetrics;
}

export interface MockCommentContent {
  created: MockCreate;
  commentText: string;
  metrics: Pick<MockMetrics, 'likes'>;
  replies: MockCommentReplies[];
}

export interface MockComment {
  total: number;
  content: MockCommentContent[];
}

export interface MockCommentReplies {
  created: MockCreate;
  replyText: string;
  likes: number;
}

export interface IMock {
  articleData: MockData;
  articleComments: MockComment;
}

export interface IReport {
  description: string;
  articleId: string;
  userId: string;
  date: Date;
}

export interface IReportModel extends IReport {
  category: SelectOption;
}

export interface IReportData extends IReport {
  category: string;
}
