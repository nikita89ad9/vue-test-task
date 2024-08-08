<template>
  <div class="moderation-articles">
    <div class="moderation-articles__wrapper">
      <ModerationSelectionPanel
        :checkboxTitle="$t('moderation.articles.selectAll')"
        :checkboxValue="allArticlesSelected"
        :counter="articlesCount"
        :counterPlaceholder="$t('moderation.articles.total')"
        @updateValue="selectAll"
      >
        <template #search>
          <BaseInput
            v-model="search"
            :placeholder="$t('moderation.articles.panel.search')"
          >
            <template #prepend-icon>
              <IconWrapper
                :icon="icons.search"
                class="multiselect__search--icon"
              />
            </template>
            <template #append-icon="{ clear }">
              <IconWrapper
                :icon="icons.close"
                class="clear"
                @click="clear()"
              />
            </template>
          </BaseInput>
        </template>
        <template #filters>
          <Multiselect
            v-model="statusesValue"
            :options="statusesOptions"
            :placeholder="$t('moderation.articles.panel.status')"
          />
          <Multiselect
            v-model="sectionsValue"
            :options="sectionsOptions"
            :placeholder="$t('moderation.articles.panel.sections')"
          />
          <Multiselect
            v-model="tagsValue"
            :options="tagsOptions"
            :placeholder="$t('moderation.articles.panel.tags')"
          />
        </template>
      </ModerationSelectionPanel>
      <BaseLayout v-if="selectedOptions.size > 0">
        <div class="moderation-articles__panel moderation-panel">
          <p class="moderation-panel__counter">
            {{ selectedOptions.size }} {{ $t('moderation.articles.selected') }}
          </p>
          <div class="moderation-panel__buttons">
            <ModerationButton approve>
              <template #icon>
                <IconWrapper :icon="icons.checkmark" />
              </template>
              <template #text> {{ $t('moderation.articles.approveAll') }} </template>
            </ModerationButton>
            <ModerationButton reject>
              <template #icon>
                <IconWrapper :icon="icons.close" />
              </template>
              <template #text> {{ $t('moderation.articles.rejectAll') }} </template>
            </ModerationButton>
          </div>
        </div>
      </BaseLayout>
      <div
        v-if="articles.length"
        class="moderation-articles__main"
      >
        <ModerationArticlesItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
          :sections="sections"
          :isSelected="selectedOptions.has(article.id)"
          @selectItem="selectItem"
        />
        <Pagination
          v-if="pageCount !== 0"
          :displayedPage="filters.page + 1"
          :pageCount="pageCount"
          @updatePage="newPage => (page = newPage - 1)"
        />
      </div>
      <BasePlaceholder
        v-else
        :placeholderText="$t('general.notFound')"
      >
      </BasePlaceholder>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, ref, watch } from 'vue';

  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import Multiselect from '@/components/Multiselect/Multiselect.vue';
  import type { IMultiselectOptionProps } from '@/components/Multiselect/types';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useArticlesStore } from '@stores/articlesStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import type { IArticleDTO } from '@/services/articles/articles.types';
  import { icons } from '@/utils/icons';
  import ModerationArticlesItem from './ModerationArticlesItem.vue';
  import ModerationButton from '../ModerationButton.vue';
  import ModerationSelectionPanel from '../ModerationSelectionPanel.vue';

  const { articles, articlesCount } = storeToRefs(useArticlesStore());
  const { getArticles } = useArticlesStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const selectedOptions = ref(new Set());

  const selectItem = (id: string) => {
    if (selectedOptions.value.has(id)) {
      selectedOptions.value.delete(id);
    } else {
      selectedOptions.value.add(id);
    }
  };

  const allArticlesSelected = ref(false);

  const selectAll = (value: boolean) => {
    if (value) {
      articles.value.forEach((article: IArticleDTO) => selectedOptions.value.add(article.id));
    } else {
      selectedOptions.value.clear();
    }
  };

  const search = ref('');

  const statusesOptions = ref([
    {
      name: 'Pending',
      id: '1',
    },
    {
      name: 'Approved',
      id: '2',
    },
    {
      name: 'Rejected',
      id: '3',
    },
  ]);

  const sectionsOptions = computed<IMultiselectOptionProps[]>(() =>
    sections.value.map(({ id, name }) => ({ id, name }))
  );

  const tagsOptions = computed<IMultiselectOptionProps[]>(() =>
    tags.value.map(({ id, name }) => ({ id, name }))
  );

  const statusesValue = ref<IMultiselectOptionProps[] | []>([]);

  const sectionsValue = ref<IMultiselectOptionProps[] | []>([]);

  const tagsValue = ref<IMultiselectOptionProps[] | []>([]);

  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(articlesCount.value / 10));

  const filters = computed(() => {
    return {
      limit: 10,
      search: search.value,
      page: pageCount.value <= page.value && page.value !== 0 ? page.value - 1 : page.value,
      // section: sectionsValue.value.map(section => section.name).join(','),
      // status: statusesValue.value.map(status => status.name).join(','),
    };
  });

  watch(filters, () => {
    getArticles(filters.value);
  });

  onMounted(() => {
    getArticles();
    getSections();
    getTags();
  });
</script>

<style scoped lang="scss">
  .moderation-articles {
    display: flex;
    gap: var(--space-m);
    min-height: 100%;

    @include w-max($lg) {
      flex-direction: column;
    }

    &__wrapper {
      height: auto;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    &__main {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }
  }

  .moderation-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__buttons {
      display: flex;

      @include w-max($sm) {
        font-weight: 600;
        min-width: 80px;
      }
    }

    &__counter {
      font-size: var(--font-size-s);
      flex-shrink: 0;
    }
  }

  .clear {
    width: var(--space-m);
    height: var(--space-m);
  }
</style>
