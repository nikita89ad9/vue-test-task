<template>
  <div class="profile-favorites">
    <NavigationPanel
      :authorsArr="authorsArr"
      :tagsArr="tagsArr"
      :topicsArr="topicsArr"
      :authorsValue="authorsValue"
      :tagsValue="tagsValue"
      :topicsValue="topicsValue"
      :sortVal="sortVal"
      :searchVal="searchVal"
      :sortOptions="sortOptions"
      :itemsVisible="itemsVisible"
      :itemsTotal="articlesCount"
      @updateSearch="value => (searchVal = value)"
      @updateSort="value => (sortVal = value)"
      @updateAuthors="value => (authorsValue = value)"
      @updateTopics="value => (topicsValue = value)"
      @updateTags="value => (tagsValue = value)"
    />
    <div
      v-if="articles.length"
      class="profile-favorites__articles"
    >
      <Article
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <BasePlaceholder
      v-else
      :placeholderText="$t('general.searchNotFound')"
    />
    <Pagination
      v-if="pageCount !== 0"
      :displayedPage="filters.page + 1"
      :pageCount="pageCount"
      @updatePage="newPage => (page = newPage - 1)"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import Article from '@pages/Articles/components/Article.vue';
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import type { IMultiselectOptionProps } from '@/components/Multiselect/types';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import NavigationPanel from './components/NavigationPanel.vue';

  const { articles, articlesCount } = storeToRefs(useArticlesStore());
  const { getArticles } = useArticlesStore();

  const { users } = storeToRefs(useUserStore());
  const { getUsers } = useUserStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { t } = useI18n();

  const topicsArr = computed<IMultiselectOptionProps[]>(() =>
    sections.value.map(({ id, name }) => ({ id, name }))
  );

  const tagsArr = computed<IMultiselectOptionProps[]>(() =>
    tags.value.map(({ id, name }) => ({ id, name }))
  );

  const authorsArr = computed<IMultiselectOptionProps[]>(() =>
    users.value.map(({ id, name, surname, email }) => ({
      id,
      name: name ? `${name} ${surname}` : email,
    }))
  );

  const authorsValue = ref<IMultiselectOptionProps[]>([]);
  const topicsValue = ref<IMultiselectOptionProps[]>([]);
  const tagsValue = ref<IMultiselectOptionProps[]>([]);

  const searchVal = ref<string>('');

  const sortVal = ref<{ name: string; value: string }>({
    value: 'createdAt',
    name: t(`articles.sortOptions.date`),
  });

  const sortOptions = computed<{ name: string; value: string }[]>(() => {
    return [
      {
        name: t('articles.sortOptions.date'),
        value: 'createdAt',
      },
      {
        name: t('articles.sortOptions.title'),
        value: 'title',
      },
    ];
  });

  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(articlesCount.value / 10));

  const authorsFilters = computed(() => authorsValue.value.map(item => item.name));

  const topicsFilters = computed(() => topicsValue.value.map(item => item.name));

  const tagsFilters = computed(() => tagsValue.value.map(item => item.name));

  const filters = computed(() => {
    return {
      limit: 10,
      search: searchVal.value,
      page: pageCount.value <= page.value && page.value !== 0 ? page.value - 1 : page.value,
      orderBy: sortVal.value.value,
      topics: topicsFilters.value[0],
      authors: authorsFilters.value[0],
      tags: tagsFilters.value[0],
    };
  });

  const itemsVisible = computed(() => {
    const start = articlesCount.value > 0 ? (page.value + 1) * 10 - 9 : 0;
    const end =
      (page.value + 1) * 9 < articlesCount.value ? (page.value + 1) * 10 : articlesCount.value;
    return {
      start: start < end ? start : end,
      end,
    };
  });

  watch(filters, () => {
    getArticles(filters.value);
  });

  onMounted(() => {
    getArticles(filters.value);
    getUsers();
    getTags();
    getSections();
  });
</script>

<style scoped lang="scss">
  .profile-favorites {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    background: transparent;

    &__articles {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }
  }
</style>
