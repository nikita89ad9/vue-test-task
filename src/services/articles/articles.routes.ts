const ARTICLES_PATH = '/articles';

export const articlesRoutes = {
  getAll: () => `${ARTICLES_PATH}`,
  create: () => `${ARTICLES_PATH}`,
  getByID: (id: string) => `${ARTICLES_PATH}/${id}`,
  update: (id: string) => `${ARTICLES_PATH}/${id}`,
  delete: (id: string) => `${ARTICLES_PATH}/${id}`,
};
