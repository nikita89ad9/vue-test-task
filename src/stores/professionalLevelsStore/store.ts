import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { professionalLevelsService } from '@/services/professionalLevels/professionalLevels.service';
import type {
  IProfessionalLevelDTO,
  IProfessionalLevelDTOCreateReq,
  IProfessionalLevelDTOUpdateReq,
} from '@/services/professionalLevels/professionalLevels.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useProfessionalLevelsStore = defineStore('professionalLevelsStore', () => {
  const professionalLevels = ref<IProfessionalLevelDTO[]>([]);
  const professionalLevelsCount = ref<number>(0);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
  });

  const getProfessionalLevels = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await professionalLevelsService.getAll(requestParams);
      defaultRequestParams.value = requestParams;

      if (response) {
        professionalLevels.value = response[0];
        professionalLevelsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getProfessionalLevel = async (id: string) => {
    try {
      await professionalLevelsService.getByID(id);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addProfessionalLevel = async (professionalLevel: IProfessionalLevelDTOCreateReq) => {
    try {
      await professionalLevelsService.create(professionalLevel);
      getProfessionalLevels();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateProfessionalLevel = async (
    id: string,
    professionalLevel: IProfessionalLevelDTOUpdateReq
  ) => {
    try {
      await professionalLevelsService.updateByID(id, professionalLevel);
      getProfessionalLevels();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteProfessionalLevel = async (id: string) => {
    try {
      await professionalLevelsService.deleteByID(id);
      getProfessionalLevels();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteSomeProfessionalLevels = async (professionalLevels: string[]) => {
    try {
      await professionalLevelsService.deleteSome(professionalLevels);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    professionalLevels,
    professionalLevelsCount,
    loaded,
    getProfessionalLevels,
    getProfessionalLevel,
    addProfessionalLevel,
    updateProfessionalLevel,
    deleteProfessionalLevel,
    deleteSomeProfessionalLevels,
  };
});
