import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { jobTitlesService } from '@/services/jobTitles/jobTitles.service';
import type {
  IJobTitleDTO,
  IJobTitleDTOCreateReq,
  IJobTitleDTOUpdateReq,
} from '@/services/jobTitles/jobTitles.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useJobTitlesStore = defineStore('jobTitlesStore', () => {
  const jobTitles = ref<IJobTitleDTO[]>([]);
  const jobTitlesCount = ref<number>(0);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
  });

  const getJobTitles = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await jobTitlesService.getAll(requestParams);
      defaultRequestParams.value = requestParams;

      if (response) {
        jobTitles.value = response[0];
        jobTitlesCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const addJobTitle = async (jobTitle: IJobTitleDTOCreateReq) => {
    try {
      await jobTitlesService.create(jobTitle);
      getJobTitles();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateJobTitle = async (id: string, jobTitle: IJobTitleDTOUpdateReq) => {
    try {
      await jobTitlesService.updateByID(id, jobTitle);
      getJobTitles();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteJobTitle = async (id: string) => {
    try {
      await jobTitlesService.deleteByID(id);
      getJobTitles();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteSomeJobTitles = async (jobTitles: string[]) => {
    try {
      await jobTitlesService.deleteSome(jobTitles);
      getJobTitles();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    jobTitles,
    jobTitlesCount,
    loaded,
    getJobTitles,
    addJobTitle,
    updateJobTitle,
    deleteJobTitle,
    deleteSomeJobTitles,
  };
});
