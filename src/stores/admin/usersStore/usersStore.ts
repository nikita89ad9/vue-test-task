import { AxiosError } from 'axios';
import { defineStore, storeToRefs } from 'pinia';

import { ref } from 'vue';

import { useUserStore } from '@/stores/userStore/store';
import { userService } from '@/services/user/user.service';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';
import type { IUser, IUserCreateData, IUserUpdate } from './model';

export const useAdminUserStore = defineStore('admin user store', () => {
  const { user } = storeToRefs(useUserStore());
  const { getUserData } = useUserStore();

  const usersList = ref<IUser[]>([]);
  const usersListCount = ref(0);

  const defaultRequestParams = ref<QueryParams>({
    orderBy: 'name',
    search: '',
    page: 0,
  });

  const getUsers = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const responce = await userService.getAll(requestParams);
      defaultRequestParams.value = requestParams;
      usersList.value = responce[0];
      usersListCount.value = responce[1];
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.delete(id);
      await getUsers();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const createUser = async (userData: IUserCreateData) => {
    try {
      await userService.create(userData);
      await getUsers();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const updateUser = async (id: string, userData: IUserUpdate) => {
    try {
      await userService.update(id, userData);
      await getUsers();
      if (id === user.value?.id) getUserData();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    usersList,
    usersListCount,
    getUsers,
    deleteUser,
    createUser,
    updateUser,
  };
});
