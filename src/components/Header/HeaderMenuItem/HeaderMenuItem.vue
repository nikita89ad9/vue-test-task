<template>
  <BaseMenuItem class="item">
    <slot name="icon" />
    <slot name="text" />
  </BaseMenuItem>
</template>

<script setup lang="ts">
  import BaseMenuItem from '@common/BaseMenu/BaseMenuItem/BaseMenuItem.vue';
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-l);
    background: var(--color-background-primary);
    color: var(--color-font-secondary);
    padding: var(--space-s) var(--space-l);
    font-size: var(--font-size-s);
    border-left: 3px solid transparent;
    min-width: 100%;
    width: max-content;

    &:deep(path) {
      fill: var(--color-font-secondary);
    }

    &:hover {
      background: var(--color-background-secondary);
      color: var(--color-primary);
      border-color: var(--color-primary);

      &:deep(path) {
        fill: var(--color-primary);
      }
    }
  }
</style>
