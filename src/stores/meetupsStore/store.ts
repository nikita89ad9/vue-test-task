import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { meetupsService } from '@/services/meetups/meetups.service';
import type { IMeetupDTO, IMeetupDTOCreateReq } from '@/services/meetups/meetups.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useMeetupsStore = defineStore('meetupsStore', () => {
  const meetups = ref<IMeetupDTO[]>([]);
  const meetupsCount = ref<number>(0);
  const selectedMeetup = ref<IMeetupDTO | null>(null);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
    limit: 6,
  });

  const getMeetups = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await meetupsService.getAll(requestParams);
      defaultRequestParams.value = requestParams;

      if (response) {
        meetups.value = response[0];
        meetupsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getMeetup = async (id: string) => {
    try {
      const response = await meetupsService.getByID(id);
      selectedMeetup.value = response;
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addMeetup = async (meetup: IMeetupDTOCreateReq) => {
    try {
      await meetupsService.create(meetup);
      getMeetups();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateMeetup = async (id: string, data: FormData) => {
    try {
      await meetupsService.update(id, data);
      getMeetups();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteMeetup = async (id: string) => {
    try {
      await meetupsService.delete(id);
      getMeetups();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    meetups,
    meetupsCount,
    selectedMeetup,
    loaded,
    getMeetup,
    getMeetups,
    addMeetup,
    updateMeetup,
    deleteMeetup,
  };
});
