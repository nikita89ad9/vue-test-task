<template>
  <i class="icon-wrapper rotated-icon__wrapper">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      isOpen: boolean;
    }>(),
    {
      isOpen: false,
    }
  );

  const rotation = computed<string>(() => {
    if (props.isOpen) {
      return '180deg';
    } else {
      return '0deg';
    }
  });
</script>

<style scoped lang="scss">
  .icon-wrapper {
    width: var(--space-xl);
    height: var(--space-xl);
    display: block;
    color: var(--color-font-primary);

    :deep(path) {
      fill: var(--color-font-secondary);
    }

    :deep(svg) {
      width: 100%;
      height: 100%;
      display: block;
      color: inherit;
    }
  }

  .rotated-icon__wrapper {
    transform: rotate(v-bind(rotation));
    cursor: pointer;
  }
</style>
