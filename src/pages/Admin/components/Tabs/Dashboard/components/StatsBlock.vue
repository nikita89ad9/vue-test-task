<template>
  <div class="stats-block">
    <p class="stats-block__label">{{ label }}</p>
    <p class="stats-block__value">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ label: string; value: string }>();
</script>

<style scoped lang="scss">
  .stats-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    gap: var(--space-xl);
    width: 100%;
    padding: var(--space-xl);
    border: var(--border-light);
    border-radius: var(--space-border-s);

    &__label {
      font-size: var(--font-size-m);
      font-family: var(--font-manrope-medium);
      color: var(--color-font-primary);
      line-height: 1.5;
    }

    &__value {
      font-size: var(--font-size-4xl);
      font-family: var(--font-manrope-semibold);
      color: var(--color-primary);
    }

    @include w-max($lg) {
      gap: var(--space-m);

      &__label {
        font-size: var(--font-size-s);
      }

      &__value {
        font-size: var(--font-size-2xl);
      }
    }
  }
</style>
