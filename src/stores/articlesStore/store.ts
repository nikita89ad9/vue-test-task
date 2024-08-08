import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { articlesService } from '@/services/articles/articles.service';
import type {
  IArticleDTO,
  IArticleDTOCreateReq,
  IArticleDTOUpdateReq,
} from '@/services/articles/articles.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useArticlesStore = defineStore('articlesStore', () => {
  const articles = ref<IArticleDTO[]>([]);
  const articlesCount = ref<number>(0);
  const selectedArticle = ref<IArticleDTO | null>(null);
  const loaded = ref(false);

  const toast = useToast();

  const { t } = useI18n();

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
    limit: 6,
  });

  const getArticles = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await articlesService.getAll(requestParams);
      defaultRequestParams.value = requestParams;
      if (response) {
        articles.value = response[0];
        articlesCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getArticle = async (id: string) => {
    try {
      const response = await articlesService.getByID(id);
      selectedArticle.value = response;
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const addArticle = async (article: IArticleDTOCreateReq) => {
    try {
      await articlesService.create(article);
      toast.success(t('articles.toasts.created'));
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateArticle = async (id: string, name: IArticleDTOUpdateReq) => {
    try {
      await articlesService.update(id, name);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await articlesService.delete(id);
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    articles,
    articlesCount,
    selectedArticle,
    loaded,
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
  };
});
