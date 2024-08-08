<template>
  <div :class="['tab', { tab__active: active }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    active: boolean;
  }>();
</script>

<style scoped lang="scss">
  .tab {
    padding: var(--space-m);
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: var(--transition-default);
    font-size: var(--font-size-s);
    color: var(--color-font-secondary);
    width: fit-content;
    text-wrap: nowrap;

    @include w-max($lg) {
      width: 100%;
      text-align: center;
      padding: var(--space-s);
    }

    @include w-max($xl) {
      font-size: var(--font-size-s);
    }

    &:hover {
      color: var(--color-font-primary);
    }

    &__active {
      background: var(--color-background-primary);
      border-bottom-color: var(--color-primary-active);
      color: var(--color-font-primary);

      @include w-max($xl) {
        border-bottom-color: transparent;
        background: var(--color-background-icon);
      }
    }
  }
</style>
