export const getCurrentPage = (page: number, pageCount: number) => {
  return pageCount <= page && page !== 0 && pageCount !== 0 ? pageCount - 1 : page;
};
