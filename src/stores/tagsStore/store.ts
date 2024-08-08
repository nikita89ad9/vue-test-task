import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { tagsService } from '@/services/tags/tags.service';
import type { ITagDTO, ITagDTOCreateReq, ITagDTOUpdateReq } from '@/services/tags/tags.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useTagsStore = defineStore('tagsStore', () => {
  const tags = ref<ITagDTO[]>([]);
  const tagsCount = ref<number>(0);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
  });

  const getTags = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await tagsService.getAll(requestParams);
      defaultRequestParams.value = requestParams;

      if (response) {
        tags.value = response[0];
        tagsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const addTag = async (tag: ITagDTOCreateReq) => {
    try {
      await tagsService.create(tag);
      getTags();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateTag = async (id: string, tag: ITagDTOUpdateReq) => {
    try {
      await tagsService.updateByID(id, tag);
      getTags();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteTag = async (id: string) => {
    try {
      await tagsService.deleteByID(id);
      getTags();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteSomeTags = async (tags: string[]) => {
    try {
      await tagsService.deleteSome(tags);
      getTags();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    tags,
    tagsCount,
    loaded,
    getTags,
    addTag,
    updateTag,
    deleteTag,
    deleteSomeTags,
  };
});
