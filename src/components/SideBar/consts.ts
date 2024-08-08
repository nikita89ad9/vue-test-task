import { computed } from 'vue';

import { icons } from '@/utils/icons';
import type { SidebarItem } from './types';

import { i18Instance } from '@/i18n';

export const siteLinks = computed<SidebarItem[]>(() => [
  { name: i18Instance.global.t('sidebar.siteLinks.admin'), icon: icons.crown, routeName: 'Admin' },
  { name: i18Instance.global.t('sidebar.siteLinks.mainPage'), icon: icons.home, routeName: 'Main' },
  {
    name: i18Instance.global.t('sidebar.siteLinks.articles'),
    icon: icons.list,
    routeName: 'Articles',
  },
  {
    name: i18Instance.global.t('sidebar.siteLinks.meetups'),
    icon: icons.laptop,
    routeName: 'Meetups',
  },
  // {
  //   name: i18Instance.global.t('sidebar.siteLinks.favs'),
  //   icon: icons.star,
  //   routeName: 'Favourites',
  // },
  {
    name: i18Instance.global.t('sidebar.siteLinks.authors'),
    icon: icons.userRounded,
    routeName: 'Authors',
  },
  {
    name: i18Instance.global.t('sidebar.siteLinks.messages'),
    icon: icons.chat,
    routeName: 'Messages',
  },
]);

export const outerResourceLinks = computed<SidebarItem[]>(() => [
  { name: 'HRM', icon: icons.multiperson, routeName: 'Test' },
  { name: 'Hotelling', icon: icons.company, routeName: 'Test' },
  { name: 'Confluence', icon: icons.document, routeName: 'Test' },
]);

export const techSupportLinks = computed<SidebarItem[]>(() => [
  { name: 'FAQ', icon: icons.help, routeName: 'Faq' },
  {
    name: i18Instance.global.t('sidebar.supportLinks.techSupport'),
    icon: icons.maintain,
    routeName: 'Support',
  },
]);
