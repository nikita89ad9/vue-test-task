const DEPARTMENTS_ROUTE = '/departments';

export const departmentsRoutes = {
  getAll: () => `${DEPARTMENTS_ROUTE}`,
  create: () => `${DEPARTMENTS_ROUTE}`,
  getByID: (id: string) => `${DEPARTMENTS_ROUTE}/${id}`,
  updateByID: (id: string) => `${DEPARTMENTS_ROUTE}/${id}`,
  deleteByID: (id: string) => `${DEPARTMENTS_ROUTE}/${id}`,
  deleteSome: () => `${DEPARTMENTS_ROUTE}`,
};
