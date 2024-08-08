<template>
  <div class="sections">
    <SectionsHeaders
      :searchVal="searchVal"
      :sortVal="sortVal"
      :sortOptions="sortOptions"
      :sortOrder="sortOrder"
      @updateSearch="value => (searchVal = value)"
      @updateSort="(value, order) => ((sortVal = value), (sortOrder = order))"
    />
    <div
      v-if="loaded && sections.length"
      class="sections__wrapper"
    >
      <SectionsItem
        v-for="item in sections"
        :key="item.id"
        :item="item"
      />
    </div>
    <BasePlaceholder
      v-else
      :placeholderText="$t('sections.noItems')"
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
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useSectionsStore } from '@stores/sectionsStore/store';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import type { SelectOption } from '@/types/Select';
  import SectionsHeaders from './components/SectionsHeaders.vue';
  import SectionsItem from './components/SectionsItem.vue';

  const { getSections } = useSectionsStore();

  const { t } = useI18n();

  const { sections, loaded, sectionsCount } = storeToRefs(useSectionsStore());

  const sortVal = ref({ name: t('sections.sortOptions.name'), value: 'name' });
  const sortOrder = ref('');

  const sortOptions = computed<SelectOption[]>(() => [
    { name: t('sections.sortOptions.name'), value: 'name' },
    { name: t('sections.sortOptions.subscribers'), value: 'subscribers' },
    { name: t('sections.sortOptions.articles'), value: 'articles' },
  ]);

  const searchVal = ref('');
  const page = ref<number>(0);
  const pageCount = computed(() => Math.ceil(sectionsCount.value / 5));

  const filters = computed(() => {
    return {
      limit: 5,
      search: searchVal.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: `${sortOrder.value}${sortVal.value.value}`,
    };
  });

  watch(filters, () => {
    getSections(filters.value);
  });

  onMounted(() => {
    getSections(filters.value);
  });
</script>

<style scoped lang="scss">
  .sections {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);

    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-xl);
    }
  }
</style>
