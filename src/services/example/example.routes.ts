const EXAMPLE = 'example';

export const exampleRoutes = {
  createExample: () => `${EXAMPLE}/`,
  updateExample: (id: string) => `${EXAMPLE}/${id}`,
};
