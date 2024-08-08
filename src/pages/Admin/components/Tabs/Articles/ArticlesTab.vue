<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <ArticlesFilters
          :user="user"
          :tags="tags"
          @updateSearch="value => (search = value)"
        />
        <DataTable
          v-if="articlesCount > 0"
          v-model="model"
          :headers="tableHeadersArticles"
          :data="formattedArticles"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteArticle(itemData.id)"
          @editItem="(itemData: any) => editArticle(itemData)"
          @routePush="router.push({ name: 'Article', params: { articleID: $event } })"
        />
        <div
          v-else
          class="tab__placeholder"
        >
          {{ $t('general.notFound') }}
        </div>
      </div>
      <Pagination
        v-if="pageCount !== 0"
        :displayedPage="filters.page + 1"
        :pageCount="pageCount"
        @updatePage="newPage => (page = newPage - 1)"
      />
    </div>
    <BaseModal ref="modal">
      <template #modal="{ close }">
        <ArticlesForm
          :user="user"
          :tags="tags"
          :sections="sections"
          :articleModel="articleModel"
          @executeCallback="
            (data: FormData) => {
              updateArticle(articleID, data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, reactive, ref, watch } from 'vue';

  import type { FormattedArticle } from '@/pages/Admin/types';
  import BaseModal from '@/components/common/BaseModal.vue';
  import DataTable from '@/components/DataTable/DataTable.vue';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import { useAdminHeaderMenu } from '@/composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import { getCurrentPage } from '@utils/getCurrentPage';
  import router from '@/router';
  import ArticlesFilters from './ArticlesFilters.vue';
  import type { ArticleModel } from './types';
  import ArticlesForm from './components/ArticlesForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { selectedArticle, articles, articlesCount } = storeToRefs(useArticlesStore());
  const { getArticles, deleteArticle, updateArticle, getArticle } = useArticlesStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const { user } = storeToRefs(useUserStore());

  const { tableHeadersArticles } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const articleModel = reactive<ArticleModel>({
    title: '',
    description: '',
    content: '',
    authorId: '',
    sectionId: '',
    preview: '',
    tags: [],
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const articleID = ref<string>('');

  const formattedArticles = computed<FormattedArticle[]>(() => {
    return articles.value.map(article => {
      const formatted = {} as FormattedArticle;
      formatted.id = article.id;
      formatted.title = article.title;
      formatted.authorName = article.author.name
        ? `${article.author.name} ${article.author.surname}`
        : '-';
      formatted.authorEmail = article.author.email;
      formatted.status = article.isPublished ? 'Published' : 'Not published';
      formatted.created = article.createdAt;
      const section = sections.value.find(section => section.id === article.sectionId);
      formatted.section = section?.name as string;
      return formatted;
    });
  });

  const editArticle = async (data: FormattedArticle) => {
    await getArticle(data.id);
    if (selectedArticle.value) {
      articleID.value = selectedArticle.value.id;
      articleModel.title = selectedArticle.value.title;
      articleModel.content = selectedArticle.value.content;
      articleModel.description = selectedArticle.value.description;
      articleModel.sectionId = selectedArticle.value.sectionId;
      articleModel.tags = selectedArticle.value.tags;
      articleModel.preview = selectedArticle.value.preview.mediaUrl;
      modal.value?.toggleModalStatus();
    }
  };

  const { menuItems } = useAdminHeaderMenu(editArticle, deleteArticle);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(articlesCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getArticles(filters.value);
  });

  onMounted(() => {
    getSections();
    getArticles(filters.value);
    getTags();
  });
</script>

<style lang="scss" scoped>
  .tab {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__table {
      height: calc(100% - var(--space-4xl) - var(--space-m));
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &__content {
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size-m);
      color: var(--color-font-secondary);
    }
  }
</style>
