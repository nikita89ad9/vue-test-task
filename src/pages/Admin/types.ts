export interface AdminTab {
  tab: string;
  tabTranslate: string;
  configurable: boolean;
}

export interface AdminTableContent {
  subscriptions: Subscription[];
  faq: Faq[];
}

export type ArticleStatus = 'Published' | 'Draft' | 'Hidden';

export interface Article {
  id: string;
  title: string;
  author: string;
  section: string;
  published: string;
  status: string;
}

export interface FormattedArticle {
  id: string;
  title: string;
  authorEmail: string;
  authorName: string;
  status: string;
  created: string;
  section: string;
}

export interface FormattedMeetup {
  id: string;
  title: string;
  authorEmail: string;
  authorName: string;
  status: string;
  created: string;
  section: string;
}

export interface Meetup {
  id: string;
  title: string;
  author: string;
  section: string;
  published: string;
  status: string;
}

export type SectionStatus = 'Visible' | 'Hidden';

export interface Section {
  id: string;
  name: string;
  moderator: string;
  created: string;
  status: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Subscription {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  price: number;
  discount: number;
  isPublished: boolean;
}

export interface Faq {
  id: string;
  name: string;
  description: string;
}
