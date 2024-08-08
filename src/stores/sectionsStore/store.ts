import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { sectionsService } from '@/services/sections/sections.service';
import type { ISectionDTO, ISectionDTOCreateReq } from '@/services/sections/sections.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useSectionsStore = defineStore('sectionsStore', () => {
  const sections = ref<ISectionDTO[]>([]);
  const sectionsCount = ref<number>(0);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
  });

  const getSections = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await sectionsService.getAll(requestParams);
      defaultRequestParams.value = requestParams;

      if (response) {
        sections.value = response[0];
        sectionsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getSection = async (id: string) => {
    try {
      await sectionsService.getByID(id);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addSection = async (section: ISectionDTOCreateReq) => {
    try {
      await sectionsService.create(section);
      getSections();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateSection = async (id: string, data: ISectionDTOCreateReq) => {
    try {
      await sectionsService.updateByID(id, data);
      getSections();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteSection = async (id: string) => {
    try {
      await sectionsService.deleteByID(id);
      getSections();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    sections,
    sectionsCount,
    loaded,
    getSections,
    getSection,
    updateSection,
    addSection,
    deleteSection,
  };
});
