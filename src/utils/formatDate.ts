import { useDateFormat } from '@vueuse/core';

const defaultFormatter: string = 'MMMM DD, YYYY';

export const formatDate = (date: Date | string, formatter: string = defaultFormatter) => {
  return useDateFormat(date, formatter, {
    locales: 'en-US',
  }).value;
};
