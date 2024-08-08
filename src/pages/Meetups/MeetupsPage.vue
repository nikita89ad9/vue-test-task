<template>
  <div class="meetups">
    <div class="meetups__block">
      <h2 class="meetups__header">{{ $t('meetups.lastMeetups') }}</h2>
      <VideoPlayer
        :url="meetups[0]?.url ?? ''"
        class="meetups__block__player"
      />
    </div>
    <NavigationPanel
      :tagsArr="tagsArr"
      :topicsArr="topicsArr"
      :tagsValue="tagsValue"
      :topicsValue="topicsValue"
      :sortVal="sortVal"
      :searchVal="searchVal"
      :sortOptions="sortOptions"
      :itemsVisible="itemsVisible"
      :itemsTotal="meetupsCount"
      @updateSearch="value => (searchVal = value)"
      @updateSort="value => (sortVal = value)"
    />
    <div
      v-if="meetups.length > 0"
      class="meetups__items"
    >
      <MeetupsCard
        v-for="item in meetups"
        :key="item.id"
        :meetup="item"
      />
    </div>
    <BasePlaceholder
      v-else
      :placeholderText="$t('articles.noResults')"
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

  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import type { IMultiselectOptionProps } from '@/components/Multiselect/types';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useMeetupsStore } from '@/stores/meetupsStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import MeetupsCard from './components/MeetupsCard.vue';
  import NavigationPanel from './components/NavigationPanel.vue';
  import VideoPlayer from './components/VideoPlayer.vue';

  const { t } = useI18n();

  const { meetups, meetupsCount } = storeToRefs(useMeetupsStore());
  const { getMeetups } = useMeetupsStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const topicsArr = computed<IMultiselectOptionProps[]>(() =>
    sections.value.map(({ id, name }) => ({ id, name }))
  );

  const tagsArr = computed<IMultiselectOptionProps[]>(() =>
    tags.value.map(({ id, name }) => ({ id, name }))
  );

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

  const pageCount = computed(() => Math.ceil(meetupsCount.value / 3));

  const filters = computed(() => {
    return {
      limit: 3,
      search: searchVal.value,
      page: pageCount.value <= page.value && page.value !== 0 ? page.value - 1 : page.value,
      orderBy: sortVal.value.value,
    };
  });

  const itemsVisible = computed(() => {
    const start = meetupsCount.value > 0 ? (page.value + 1) * 3 - 2 : 0;
    const end =
      (page.value + 1) * 3 < meetupsCount.value ? (page.value + 1) * 3 : meetupsCount.value;
    return {
      start: start < end ? start : end,
      end,
    };
  });

  watch(filters, () => {
    getMeetups(filters.value);
  });

  onMounted(() => {
    getMeetups();
    getSections();
    getTags();
  });
</script>

<style scoped lang="scss">
  .meetups {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    @include w-max($xl) {
      gap: var(--space-xl);
    }

    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-xl);

      h2 {
        align-self: flex-start;
      }

      &__player {
        width: 100%;
      }
    }

    &__header {
      font-size: var(--font-size-2xl);
      font-family: var(--font-manrope-semibold);
      color: var(--color-font-primary);

      @include w-max($xl) {
        font-size: var(--font-size-l);
      }
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-xl);
      width: 100%;

      @include w-max($xxl) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      background: var(--color-background-primary);
      padding: var(--space-xl);
      margin-bottom: var(--space-xl);
      border-radius: var(--space-border-s);
    }
  }
</style>
