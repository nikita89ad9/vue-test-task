<template>
  <div class="recommendations">
    <h3 class="recommendations__heading">{{ $t('articles.recommended') }}</h3>
    <div class="recommendations__content">
      <RecommendedItem
        v-for="item in items"
        v-bind="item"
        :key="item.title"
        class="recommendations__item"
      />
    </div>
    <BaseButton @click="router.push({ name: 'Articles' })">See all articles</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import RecommendedItem from '@/components/RecommendedItem/RecommendedItem.vue';
  import router from '@/router';
  import type { RecomnedationItem } from '@/types/Recommended';

  defineProps<{
    items: RecomnedationItem[];
  }>();
</script>

<style scoped lang="scss">
  .recommendations {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);

    &__heading {
      font-size: var(--font-size-l);
      font-weight: 600;
      color: var(--color-font-primary);
    }

    &__content {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      gap: var(--space-m);
      flex-wrap: wrap;
    }

    &__item {
      flex-grow: 1;
      flex-basis: 350px;
    }
  }
</style>
