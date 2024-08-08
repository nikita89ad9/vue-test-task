import type { AdminTableContent, Faq, Subscription } from './types';

export const amountOptions: { name: string; value: string }[] = [
  { name: '5', value: '5' },
  { name: '10', value: '10' },
  { name: '25', value: '25' },
  { name: '50', value: '50' },
];

const tableContentSubscriptions: Subscription[] = [
  {
    id: '1',
    title: 'Monthly',
    subtitle: '5$ / month',
    features: [
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
    ],
    price: 10,
    discount: 20,
    isPublished: false,
  },
  {
    id: '2',
    title: 'Monthly',
    subtitle: '5$/month',
    features: [
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
    ],
    price: 10,
    discount: 5,
    isPublished: false,
  },
  {
    id: '3',
    title: 'Monthly',
    subtitle: '5$ / month',
    features: [
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
      'Lorem ipsum dolor sit amen',
    ],
    price: 10,
    discount: 5,
    isPublished: false,
  },
];

const tableContentFaq: Faq[] = [
  {
    id: '1',
    name: 'What is this website for?',
    description:
      'This website serves as blogging platform with elements of a social network, in which every user can create articles, add recorded meetups, share thoughts with other people or just save links to interesting and educational content.',
  },
  {
    id: '1',
    name: 'What is this website for?',
    description:
      'This website serves as blogging platform with elements of a social network, in which every user can create articles, add recorded meetups, share thoughts with other people or just save links to interesting and educational content.',
  },
  {
    id: '1',
    name: 'What is this website for?',
    description:
      'This website serves as blogging platform with elements of a social network, in which every user can create articles, add recorded meetups, share thoughts with other people or just save links to interesting and educational content.',
  },
  {
    id: '1',
    name: 'What is this website for?',
    description:
      'This website serves as blogging platform with elements of a social network, in which every user can create articles, add recorded meetups, share thoughts with other people or just save links to interesting and educational content.',
  },
];

export const adminTableContent: AdminTableContent = {
  subscriptions: tableContentSubscriptions,
  faq: tableContentFaq,
};
