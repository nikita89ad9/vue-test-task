export interface MeetupModel {
  title: string;
  description: string;
  url: string;
  authorId: string;
  sectionId: string;
  preview: File | string;
  isPublished: string;
  participants: string;
  tags: {
    name: string;
    id: string;
  }[];
}
