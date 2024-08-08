<template>
  <div class="main">
    <ArticlesSection
      v-if="articles.length"
      :articles="articles"
    />
    <AuthorBadge />
    <MeetupsSection
      v-if="meetups.length"
      :meetups="meetups"
    />
    <AuthorsSection
      v-if="usersList.length"
      :authors="usersList"
    />
    <TopicsSection
      v-if="sections.length"
      :sections="sections"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { onMounted } from 'vue';

  import { useAdminUserStore } from '@/stores/admin/usersStore/usersStore';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useMeetupsStore } from '@/stores/meetupsStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import ArticlesSection from './Components/Articles/ArticlesSection.vue';
  import AuthorsSection from './Components/Authors/AuthorsSection.vue';
  import MeetupsSection from './Components/Meetups/MeetupsSection.vue';
  import AuthorBadge from './Components/Others/AuthorBadge.vue';
  import TopicsSection from './Components/Topics/TopicsSection.vue';

  const { articles } = storeToRefs(useArticlesStore());
  const { getArticles } = useArticlesStore();

  const { meetups } = storeToRefs(useMeetupsStore());
  const { getMeetups } = useMeetupsStore();

  const { usersList } = storeToRefs(useAdminUserStore());
  const { getUsers } = useAdminUserStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const articlesFilters = {
    limit: 8,
    page: 0,
    orderBy: 'createdAt',
  };

  const meetupsFilters = {
    limit: 8,
    page: 0,
    orderBy: '-createdAt',
  };

  const authorsFilters = {
    limit: 4,
    page: 0,
    orderBy: '-createdAt',
  };

  const sectionsFilters = {
    limit: 8,
    page: 0,
    orderBy: '-createdAt',
  };

  onMounted(() => {
    getSections(sectionsFilters);
    getArticles(articlesFilters);
    getUsers(authorsFilters);
    getMeetups(meetupsFilters);
  });
</script>

<style scoped lang="scss">
  .main {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: var(--space-xl);
  }
</style>
