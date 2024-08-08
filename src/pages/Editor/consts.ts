import type { IArticleDTO } from '@/services/articles/articles.types';

export const articleData: IArticleDTO = {
  author: {
    createdAt: '2023-12-03T19:30:56.565Z',
    department: 'Vue',
    email: '1@gmail.com',
    id: 'a2075739-8fe7-4da4-8600-7b45dd7eaa9f',
    jobTitle: 'Developer',
    name: 'John',
    professionalLevel: 'Senior',
    roles: ['user', 'admin'],
    surname: 'Doe',
    updatedAt: '2023-12-03T19:30:56.565Z',
  },
  authorId: 'a2075739-8fe7-4da4-8600-7b45dd7eaa9f',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  createdAt: '2023-12-03T20:05:13.822Z',
  description: 'No description',
  id: 'd392e385-0069-44cc-bc39-7f9a2d79ecd0',
  isPublished: true,
  preview: {
    createdAt: '2023-12-03T20:05:13.784Z',
    id: '4437df1b-57d9-4829-983d-0b29700610e9',
    mediaRemoteUrl: null,
    mediaUrl: '98ce948e-297b-4d53-b3d3-55b7520b9388.jpg',
    originalName: 'random.jpg',
    updatedAt: '2023-12-03T20:05:13.784Z',
  },
  previewId: '4437df1b-57d9-4829-983d-0b29700610e9',
  sectionId: '7f06164c-6096-40b1-873f-f8d5e93af9e6',
  tags: [
    {
      id: '5b8f18b4-996f-4d26-bc4d-9139893d1071',
      name: 'Javascript',
    },
    {
      id: 'ee7cbd37-a62b-434c-af0b-145d992022c9',
      name: 'React',
    },
    {
      id: '48e91267-173d-43ac-96e9-ad281420a91d',
      name: 'Vue',
    },
  ],
  title: 'My article title',
  updatedAt: '2023-12-03T20:05:13.822Z',
};
