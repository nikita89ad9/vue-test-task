const USER_PATH = '/users';

export const userRoutes = {
  getAll: () => `${USER_PATH}`,
  create: () => `${USER_PATH}`,
  update: (id: string) => `${USER_PATH}/${id}`,
  delete: (id: string) => `${USER_PATH}/${id}`,
  getByID: (id: string) => `${USER_PATH}/${id}`,
};
