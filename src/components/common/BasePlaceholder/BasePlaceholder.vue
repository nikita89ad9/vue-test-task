<template>
  <div class="placeholder">{{ placeholderText }}</div>
</template>

<script setup lang="ts">
  defineProps<{
    placeholderText: string;
  }>();
</script>

<style scoped lang="scss">
  .placeholder {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: var(--color-background-primary);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border-radius: var(--space-border-s);
    color: var(--color-font-secondary);
    font-size: var(--font-size-l);
    line-height: 1.5;
    text-align: center;

    @include w-max($lg) {
      height: 100px;
      font-size: var(--font-size-s);
    }
  }
</style>
