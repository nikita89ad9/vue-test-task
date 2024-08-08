export interface ModerationReportItem {
  id: string;
  createdAt: Date;
  category: string;
  user: string;
  description: string;
  articleID: string;
}
