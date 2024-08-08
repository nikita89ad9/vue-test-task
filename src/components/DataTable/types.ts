import type { Component } from 'vue';

import type {
  Article,
  FormattedArticle,
  FormattedMeetup,
  Meetup,
  Section,
  Subscription,
  Tag,
} from '@pages/Admin/types';
import type { ModerationReportItem } from '@/pages/Moderation/ModerationReports/types';
import type { IUser } from '@/stores/admin/usersStore/model';
import type { IArticleDTO } from '@/services/articles/articles.types';
import type { IMeetupDTO } from '@/services/meetups/meetups.types';
import type { ISectionDTO } from '@/services/sections/sections.types';
import type { ITagDTO } from '@/services/tags/tags.types';

export interface TableValue {
  id: string;
}

export interface HeaderMenu<T> {
  icon: Component;
  text: string;
  name: string;
  action: (data: T) => void;
}

export interface TableHeader {
  key: string;
  text: string;
}

export type DataTableUnion =
  | IUser
  | Article
  | FormattedArticle
  | Meetup
  | Section
  | Tag
  | Subscription
  | ModerationReportItem;

export type HeaderMenuUnion =
  | IUser
  | IArticleDTO
  | IMeetupDTO
  | FormattedMeetup
  | ITagDTO
  | ISectionDTO
  | Subscription
  | ModerationReportItem;
