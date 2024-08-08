export interface ArticleModel {
  title: string;
  description: string;
  content: string;
  authorId: string;
  sectionId: string;
  preview: File | string;
  tags: {
    name: string;
    id: string;
  }[];
}
