<template>
  <button
    class="item"
    :title="title"
    :disabled="disabled"
    :class="{ 'item-disabled': disabled, 'item-active': active }"
    @click="emitMethod"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string;
      disabled?: boolean;
      active?: boolean;
    }>(),
    {
      disabled: false,
      active: false,
    }
  );

  const emitMethod = () => {
    emit('updateEditor');
  };

  const emit = defineEmits<(e: 'updateEditor') => void>();
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    padding: var(--space-xs);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

    :deep(path) {
      fill: var(--color-font-primary);
    }

    &:hover,
    &-active {
      background: var(--color-third);
      filter: brightness(1.4);
    }

    &-disabled {
      opacity: 0.5;

      &:hover {
        background: transparent;
      }
    }
  }
</style>
