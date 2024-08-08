<template>
  <div class="moderation-comments">
    <div class="moderation-comments__wrapper">
      <ModerationSelectionPanel
        :checkboxTitle="$t('moderation.comments.selectAll')"
        :checkboxValue="allCommentsSelected"
        :counter="commentsCount"
        :counterPlaceholder="$t('moderation.comments.total')"
        @updateValue="selectAll"
      >
        <template #search>
          <BaseInput
            v-model="search"
            :placeholder="$t('moderation.comments.panel.search')"
          >
            <template #prepend-icon>
              <IconWrapper :icon="icons.search" />
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
          <div class="moderation-comments__filters">
            <ModerationSelect
              v-model="dateValue"
              :options="dateOptions"
              iconName="calendar"
            />
            <ModerationSelect
              v-model="sortValue"
              :options="sortOptions"
              iconName="sort"
            />
          </div>
        </template>
      </ModerationSelectionPanel>
      <div
        v-if="comments.length"
        class="moderation-comments__main"
      >
        <ModerationCommentsItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          @deleteComment="(id: string) => console.log(`Deleting comment with id ${id}`)"
          @blockUser="(id: string) => console.log(`Blocking user with id ${id}`)"
        />
        <Pagination
          :displayedPage="1"
          :pageCount="1"
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

  import { onMounted, ref } from 'vue';

  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useCommentsStore } from '@/stores/commentsStore/store';
  import { useModerationOptions } from '@/composables/useModerationOptions';
  import { icons } from '@/utils/icons';
  import ModerationCommentsItem from './ModerationCommentsItem.vue';
  import ModerationSelect from '../ModerationSelect.vue';
  import ModerationSelectionPanel from '../ModerationSelectionPanel.vue';

  const { dateValue, dateOptions, sortValue, sortOptions } = useModerationOptions();

  const { getArticle } = useArticlesStore();

  const { comments, commentsCount } = storeToRefs(useCommentsStore());
  const { getComments } = useCommentsStore();

  const articleID = 'c49fe05a-3df3-4343-a694-528b571e2d3e';

  const allCommentsSelected = ref(false);

  const search = ref('');

  const selectAll = (value: boolean) => {
    alert(value);
  };

  onMounted(async () => {
    await getArticle(articleID);
    getComments();
  });
</script>

<style scoped lang="scss">
  .moderation-comments {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    &__main {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    &__filters {
      display: flex;
      align-items: flex-end;
      align-self: flex-end;
      margin-left: auto;
      gap: var(--space-s);
    }
  }

  .clear {
    width: var(--space-m);
    height: var(--space-m);
  }
</style>
