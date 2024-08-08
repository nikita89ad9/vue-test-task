const SECTIONS_ROUTE = '/sections';

export const sectionsRoutes = {
  getSections: () => `${SECTIONS_ROUTE}`,
  createSection: () => `${SECTIONS_ROUTE}`,
  getByID: (id: string) => `${SECTIONS_ROUTE}/${id}`,
  updateByID: (id: string) => `${SECTIONS_ROUTE}/${id}`,
  deleteByID: (id: string) => `${SECTIONS_ROUTE}/${id}`,
};
