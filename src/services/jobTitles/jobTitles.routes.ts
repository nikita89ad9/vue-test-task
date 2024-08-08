const JOB_TITLES_ROUTE = '/job-titles';

export const jobTitlesRoutes = {
  getAll: () => `${JOB_TITLES_ROUTE}`,
  create: () => `${JOB_TITLES_ROUTE}`,
  getByID: (id: string) => `${JOB_TITLES_ROUTE}/${id}`,
  updateByID: (id: string) => `${JOB_TITLES_ROUTE}/${id}`,
  deleteByID: (id: string) => `${JOB_TITLES_ROUTE}/${id}`,
  deleteSome: () => `${JOB_TITLES_ROUTE}`,
};
