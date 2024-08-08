const PROFESSIONAL_LEVELS_ROUTE = '/professional-levels';

export const professionalLevelsRoutes = {
  getAll: () => `${PROFESSIONAL_LEVELS_ROUTE}`,
  create: () => `${PROFESSIONAL_LEVELS_ROUTE}`,
  getByID: (id: string) => `${PROFESSIONAL_LEVELS_ROUTE}/${id}`,
  updateByID: (id: string) => `${PROFESSIONAL_LEVELS_ROUTE}/${id}`,
  deleteByID: (id: string) => `${PROFESSIONAL_LEVELS_ROUTE}/${id}`,
  deleteSome: () => `${PROFESSIONAL_LEVELS_ROUTE}`,
};
