<template>
  <BaseLayout class="topics">
    <SectionHeader :header="topicsHeader" />
    <div class="topics__grid">
      <TopicsItem
        v-for="item in sections"
        :key="item.id"
        :section="item"
        @redirectToTarget="redirectToTarget"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import router from '@/router';
  import TopicsItem from './TopicsItem.vue';
  import SectionHeader from '../SectionHeader.vue';

  defineProps<{
    sections: ISectionDTO[];
  }>();

  const topicsHeader = {
    title: 'general.topics',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    route: 'Sections',
  };

  const redirectToTarget = (id: string) => {
    router.push({ name: 'Article', params: { articleID: id } });
  };
</script>

<style scoped lang="scss">
  .topics {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
    background-color: var(--color-background-primary);

    &__header {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: var(--space-m);

      &--p {
        font-size: var(--font-size-m);
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-auto-rows: 1fr;
      gap: var(--space-m);

      @include w-max($lg) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }
    }
  }
</style>
