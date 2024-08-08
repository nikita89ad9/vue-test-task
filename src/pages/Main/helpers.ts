export const stringCutter = (value: string, limit: number) => {
  if (value.length > limit) return value.substring(0, limit) + '...';
  else return value;
};
