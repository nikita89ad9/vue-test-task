import { ErrorHandler } from '@utils/errorHandler';

export const useCreateLocalStorage = <V extends string = string>(key: string) => {
  const set = (value: V) => {
    ErrorHandler(() => {
      localStorage.setItem(key, value);
    });
  };

  const get = () => {
    return ErrorHandler(() => localStorage.getItem(key) ?? null);
  };

  return { get, set };
};
