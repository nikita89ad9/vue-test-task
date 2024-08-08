import type { IMock } from './types';

export const mock: IMock = {
  articleData: {
    title: 'Title',
    created: {
      authorName: 'Name Surename',
      date: 1695731896593,
    },
    article: {},
    tags: ['Vue', 'React', 'Among us', 'How to basic'],
    metrics: {
      likes: 42,
      comments: 41,
    },
  },
  articleComments: {
    total: 28,
    content: [
      {
        created: {
          authorName: 'Name Surename',
          date: 1695831896593,
        },
        commentText:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis ducimus fugiat similique quisquam distinctio suscipit laborum labore, necessitatibus beatae amet maxime aut quas deserunt adipisci quo, mollitia vel, ea laudantium nihil dolor temporibus molestias voluptas. Vitae mollitia a in corrupti.',
        metrics: {
          likes: 84,
        },
        replies: [
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 5,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 0,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'pogslide',
            likes: 5,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 0,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'pogslide',
            likes: 5,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'xd',
            likes: 0,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 5,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'xd',
            likes: 0,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'pogslide',
            likes: 5,
          },
          {
            created: {
              authorName: 'Name Surename',
              date: 1695831896593,
            },
            replyText: 'xd',
            likes: 0,
          },
        ],
      },
      {
        created: {
          authorName: 'Name Surename',
          date: 1695831896593,
        },
        commentText:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis ducimus fugiat similique quisquam distinctio suscipit laborum labore, necessitatibus beatae amet maxime aut quas deserunt adipisci quo, mollitia vel, ea laudantium nihil dolor temporibus molestias voluptas. Vitae mollitia a in corrupti.',
        metrics: {
          likes: 84,
        },
        replies: [],
      },
    ],
  },
};

export type ArticleMock = typeof mock;
