import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import type { IUserData } from '@stores/authStore/models';
import { authService } from '@/services/auth/auth.service';
import { catchError } from '@/utils/catchError';
import router from '@/router';
import { useUserStore } from '../userStore/store';

export const useAuthStore = defineStore('auth_store', () => {
  const { getUserData } = useUserStore();

  const INIT_STATE = {
    email: '',
    password: '',
  };

  const userData = ref<IUserData>({
    email: '',
    password: '',
  });

  const refreshStatus = ref<boolean>(false);

  const authLoading = ref<boolean>(false);

  const registerUser = async () => {
    authLoading.value = true;
    try {
      await authService.register(userData.value);
      await getUserData();
      router.push({ name: 'Main' });
    } catch (err) {
      catchError(err as AxiosError);
    } finally {
      userData.value = INIT_STATE;
      authLoading.value = false;
    }
  };

  const loginWithGoogle = () => {
    authService.googleAuth();
  };

  const loginUser = async () => {
    authLoading.value = true;
    try {
      await authService.login(userData.value);
      await getUserData();
      router.push({ name: 'Main' });
    } catch (err) {
      catchError(err as AxiosError);
    } finally {
      userData.value = INIT_STATE;
      authLoading.value = false;
    }
  };

  const logOut = async () => {
    try {
      await authService.logout();
      router.push({ name: 'Login' });
    } catch (err) {
      catchError(err as AxiosError);
    } finally {
      userData.value = INIT_STATE;
    }
  };

  const setRefreshStatus = (status: boolean) => {
    refreshStatus.value = status;
  };
  return {
    userData,
    refreshStatus,
    authLoading,
    registerUser,
    loginUser,
    logOut,
    setRefreshStatus,
    loginWithGoogle,
  };
});
