const MEDIA_PATH = '/media';

export const mediaRoutes = {
  getByID: (id: string) => `${MEDIA_PATH}/${id}`,
  delete: (id: string) => `${MEDIA_PATH}/${id}`,
  create: () => `${MEDIA_PATH}`,
};
