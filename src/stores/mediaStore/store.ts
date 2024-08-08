import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { mediaService } from '@/services/media/media.service';
import type { IMediaDTO, IMediaDTOCreateReq } from '@/services/media/media.types';
import { catchError } from '@/utils/catchError';

export const useMediaStore = defineStore('mediaStore', () => {
  const sections = ref<IMediaDTO[]>([]);
  const loaded = ref(false);

  const getMedia = async (id: string) => {
    try {
      await mediaService.getByID(id);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addMedia = async (mediafile: IMediaDTOCreateReq) => {
    try {
      const res = await mediaService.create(mediafile);
      return res;
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const deleteMedia = async (id: string) => {
    try {
      await mediaService.deleteByID(id);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    sections,
    loaded,
    addMedia,
    deleteMedia,
    getMedia,
  };
});
