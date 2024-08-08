<template>
  <div :class="['faq__item faq-item', { 'faq-item_active': isActive }]">
    <div class="faq-item__header">
      <h2 class="faq-item__title">
        {{ title }}

        <IconWrapper
          :icon="isActive ? icons.minusIcon : icons.plusIcon"
          class="faq-item__icon"
        />
      </h2>
    </div>
    <div class="faq-item__content">
      <div class="faq-item__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';

  defineProps<{
    isActive: boolean;
    text: string;
    title: string;
  }>();
</script>

<style scoped lang="scss">
  .faq-item {
    width: 100%;
    overflow: hidden;

    &__header {
      padding: var(--space-xl);
      background: var(--color-extra-light);
      cursor: pointer;
      position: relative;
      z-index: 2;
    }

    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-size-m);
      gap: var(--space-s);
      line-height: 1.4;
    }

    &__icon {
      display: flex;
      flex-shrink: 0;
      width: var(--space-l);
      height: var(--space-l);
      transition: 0.2s all;

      :deep(path) {
        fill: var(--color-font-primary);
      }
    }

    &__content {
      transition: 0.2s all;
      background: var(--color-background-secondary);
      max-height: 0;
    }

    &__text {
      color: var(--color-font-secondary);
      padding: var(--space-xl);
      font-size: var(--font-size-m);
      line-height: 1.5;
    }

    &_active {
      .faq-item__content {
        max-height: 380px;
      }
    }

    @include w-max($sm) {
      &__header {
        padding: var(--space-m);
      }

      &__title {
        font-size: var(--font-size-s);
      }

      &__text {
        font-size: var(--font-size-s);
        padding: var(--space-m);
      }

      &_active {
        .faq-item__content {
          max-height: 3000px;
        }
      }
    }
  }
</style>
