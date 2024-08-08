const TAGS_ROUTE = '/tags';

export const tagsRoutes = {
  getAll: () => `${TAGS_ROUTE}`,
  create: () => `${TAGS_ROUTE}`,
  updateByID: (id: string) => `${TAGS_ROUTE}/${id}`,
  deleteByID: (id: string) => `${TAGS_ROUTE}/${id}`,
  deleteSome: () => `${TAGS_ROUTE}`,
};
