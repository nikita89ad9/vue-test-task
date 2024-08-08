import axios, { type Axios, AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/authStore/store';
import { useCookies } from '@/composables/useCookies';
import { authService } from '@/services/auth/auth.service';
import { catchError } from '@/utils/catchError';
import { getFilePath } from '@/utils/getFilePath';
import router from '@/router';
import { serializeParams } from './serializeParams';

const { getCookie } = useCookies();

export const baseURL = getFilePath('api');

export const createAPI = (contentType?: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': contentType ? contentType : 'application/json',
    },
    paramsSerializer: {
      serialize: serializeParams,
    },
    withCredentials: true,
  });

  api.interceptors.request.use(async config => {
    const cookies = getCookie('access_token');
    const { refreshStatus } = storeToRefs(useAuthStore());
    const { setRefreshStatus } = useAuthStore();

    if (cookies) {
      config.headers['Authorization'] = `Bearer ${cookies}`;
    }

    if (!cookies && !refreshStatus.value) {
      try {
        setRefreshStatus(true);
        const newTokens = await authService.refresh();
        config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
        setRefreshStatus(false);
      } catch (refreshError) {
        catchError(refreshError as AxiosError);
        router.push({ name: 'Login' });
        throw refreshError;
      }
    }

    return config;
  });

  return api;
};

export const getResponseData = <T>(response: AxiosResponse<T>): T => response.data;

export const getHttpWrapper = (axiosInstance: Axios) => {
  return {
    get: <Res>(url: string, config?: AxiosRequestConfig) =>
      axiosInstance.get<Res>(url, config).then(getResponseData),
    post: <Res, Req = unknown>(url: string, body?: Req) =>
      axiosInstance.post<Res>(url, body).then(getResponseData),
    patch: <Res, Req = unknown>(url: string, body?: Req) =>
      axiosInstance.patch<Res>(url, body).then(getResponseData),
    delete: <Res = void, Req = unknown>(url: string, params?: Req) =>
      axiosInstance.delete<Res>(url, { params: { ids: params } }).then(getResponseData),
    put: <Res, Req = unknown>(url: string, body?: Req) =>
      axiosInstance.put<Res>(url, body).then(getResponseData),
  };
};

export const httpRequest = (contentType?: string) => getHttpWrapper(createAPI(contentType));
