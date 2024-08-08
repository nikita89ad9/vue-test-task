import { DOMAIN } from '@env/env.d.ts';

export const getFilePath = (url: string) => {
  return `${DOMAIN}/${url}`;
};
