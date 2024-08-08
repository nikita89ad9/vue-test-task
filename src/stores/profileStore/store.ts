import type { AxiosError } from 'axios';
import { defineStore, storeToRefs } from 'pinia';

import { ref } from 'vue';

import type { IAuthInfoDTORes } from '@/services/auth/auth.types';
import { userService } from '@/services/user/user.service';
import type { IUserUpdateDTOReq } from '@/services/user/user.types';
import { catchError } from '@/utils/catchError';
import { useUserStore } from '../userStore/store';

export const useProfileStore = defineStore('profile store', () => {
  const { user } = storeToRefs(useUserStore());
  const { setUser } = useUserStore();

  const profile = ref<IAuthInfoDTORes>();

  const setProfile = (profileData: IAuthInfoDTORes) => {
    profile.value = profileData;
  };

  const getProfile = async (profileId: string) => {
    try {
      const response = await userService.getById(profileId);
      setProfile(response);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const updateProfile = async (id: string, updateData: IUserUpdateDTOReq) => {
    try {
      const response = await userService.update(id, updateData);
      setProfile(response);
      if (user.value?.id === id) setUser(response);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    profile,
    setProfile,
    updateProfile,
    getProfile,
  };
});
