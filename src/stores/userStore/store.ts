import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { computed, ref } from 'vue';

import { useCookies } from '@/composables/useCookies';
import { authService } from '@/services/auth/auth.service';
import type { IAuthDTO, IAuthInfoDTORes } from '@/services/auth/auth.types';
import { userService } from '@/services/user/user.service';
import { catchError } from '@/utils/catchError';
import { UserRoles } from '@/types/enums/user';

export const useUserStore = defineStore('user store', () => {
  const { getCookie } = useCookies();

  const users = ref<IAuthInfoDTORes[] | []>([]);
  const usersLoaded = ref(false);

  const user = ref<IAuthInfoDTORes>();

  const isAdmin = computed<boolean>(() => !!user.value?.roles.includes(UserRoles.Admin));
  const isModer = computed<boolean>(() => !!user.value?.roles.includes(UserRoles.Moderator));

  const setUser = (userData: IAuthDTO) => {
    user.value = userData;
  };

  const getUserData = async () => {
    const cookies = getCookie('access_token');

    if (cookies) {
      try {
        const response = await authService.info();
        setUser(response);
      } catch (err) {
        catchError(err as AxiosError);
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await userService.getAll();
      if (response) {
        users.value = response[0];
        usersLoaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  return {
    user,
    isAdmin,
    isModer,
    users,
    usersLoaded,
    setUser,
    getUserData,
    getUsers,
  };
});
