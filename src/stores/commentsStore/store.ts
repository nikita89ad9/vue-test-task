import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { storeToRefs } from 'pinia';

import { ref } from 'vue';

import { commentsService } from '@/services/comments/comments.service';
import type { ICommentDTO, ICommentDTOCreateReq } from '@/services/comments/comments.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';
import { useArticlesStore } from '../articlesStore/store';

export const useCommentsStore = defineStore('commentsStore', () => {
  const { selectedArticle } = storeToRefs(useArticlesStore());

  const comments = ref<ICommentDTO[]>([]);
  const commentsCount = ref<number>(0);
  const selectedComment = ref<ICommentDTO | null>(null);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    orderBy: '-createdAt',
  });

  const getComments = async (requestParams: QueryParams = defaultRequestParams.value) => {
    if (!selectedArticle.value) return;
    try {
      const response = await commentsService.getAll(requestParams, selectedArticle.value?.id);
      if (response) {
        comments.value = response[0];
        commentsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getComment = async (id: string) => {
    try {
      const response = await commentsService.getByID(id);
      selectedComment.value = response;
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addComment = async (comment: ICommentDTOCreateReq) => {
    try {
      await commentsService.create(comment);
      getComments();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateComment = async (id: string, content: string) => {
    const commentUpdate = {
      content: content,
    };
    try {
      await commentsService.update(id, commentUpdate);
      getComments();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await commentsService.delete(id);
      getComments();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    comments,
    commentsCount,
    selectedComment,
    loaded,
    getComment,
    getComments,
    addComment,
    updateComment,
    deleteComment,
  };
});
