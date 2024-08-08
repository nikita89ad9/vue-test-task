import { AxiosError, AxiosHeaders } from 'axios';

export const createCustomError = (status: number, msg: string) => {
  const request = { path: '/foo' };
  const headers = new AxiosHeaders();

  const config = {
    url: 'http://localhost:3000',
    headers,
  };

  const error = new AxiosError(msg, '404', config, request, {
    status,
    data: { foo: 'bar' },
    statusText: 'ok',
    config,
    headers,
  });

  return error;
};
