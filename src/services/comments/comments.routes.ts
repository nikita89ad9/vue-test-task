const COMMENTS_PATH = '/comments';
const ARTICLES_PATH = '/articles';

export const commentsRoutes = {
  getAll: (articleID: string) => `${ARTICLES_PATH}/${articleID}${COMMENTS_PATH}`,
  create: () => `${COMMENTS_PATH}`,
  getByID: (id: string) => `${COMMENTS_PATH}/${id}`,
  update: (id: string) => `${COMMENTS_PATH}/${id}`,
  delete: (id: string) => `${COMMENTS_PATH}/${id}`,
};
