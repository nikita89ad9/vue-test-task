import { baseURL } from '@/api';

const AUTH_PATH = '/auth';

export const authRoutes = {
  googleAuth: () => `${baseURL}${AUTH_PATH}/google`,
  register: () => `${AUTH_PATH}/register`,
  login: () => `${AUTH_PATH}/login`,
  logout: () => `${AUTH_PATH}/logout`,
  refresh: () => `${AUTH_PATH}/refresh`,
  info: () => `${AUTH_PATH}/me`,
};
