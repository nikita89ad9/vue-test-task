<template>
  <div :class="['subs-card', { 'subs-card--active': isActiveSubscription }]">
    <h3 class="subs-card__header">
      <p class="subs-card__header__label">{{ label }}</p>
      <p class="subs-card__header__price">{{ price }}$ / month</p>
    </h3>
    <BaseButton @click="select">Select</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import { useSubscriptionStore } from '@stores/subscriptionStore/store';
  import type { ISubscription } from './types';

  const props = defineProps<ISubscription>();

  const { isActive, setActive } = useSubscriptionStore();

  const isActiveSubscription = computed(() => isActive(props.id));

  const select = () => {
    setActive(props.id);
  };
</script>

<style scoped lang="scss">
  .subs-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 220px;
    justify-content: space-between;
    padding: var(--space-3xl);
    border: var(--border-card);
    border-radius: var(--space-border-s);
    box-shadow: var(--widget-shadow);

    &--active {
      border: var(--border-card-active);
    }

    @include w-max($lg) {
      flex-direction: row;
      height: fit-content;
      gap: var(--space-l);
      width: 100%;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-ml);

      &__label {
        font-size: var(--font-size-xl);
        font-family: var(--font-manrope-medium);
        letter-spacing: var(--letter-spacing-xs);
      }

      &__price {
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);
      }

      @include w-max($lg) {
        flex-direction: row;
      }

      @include w-max($sm) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
</style>
