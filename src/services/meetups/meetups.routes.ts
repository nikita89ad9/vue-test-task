const MEETUPS_ROUTES = '/meetups';

export const meetupsRoutes = {
  getAll: () => `${MEETUPS_ROUTES}`,
  create: () => `${MEETUPS_ROUTES}`,
  getByID: (id: string) => `${MEETUPS_ROUTES}/${id}`,
  update: (id: string) => `${MEETUPS_ROUTES}/${id}`,
  delete: (id: string) => `${MEETUPS_ROUTES}/${id}`,
};
