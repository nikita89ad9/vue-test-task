<template>
  <i :class="['icon-wrapper', { 'icon-wrapper_regular': regular }]">
    <component :is="icon" />
  </i>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';

  defineProps<{
    icon: Component;
    regular?: boolean;
  }>();
</script>

<style scoped lang="scss">
  .icon-wrapper {
    width: var(--space-xl);
    height: var(--space-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-font-secondary);

    &_regular {
      :deep(path) {
        fill: var(--color-font-secondary);
      }
    }

    :deep(svg) {
      width: 100%;
      height: 100%;
      display: block;
      color: inherit;
    }
  }
</style>
