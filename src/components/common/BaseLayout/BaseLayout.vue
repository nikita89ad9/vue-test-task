<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .layout {
    width: 100%;
    background: var(--color-background-primary);
    padding: var(--space-xl);
    margin: 0;
    border-radius: var(--space-border-s);
    box-shadow: var(--container-shadow);
    box-sizing: border-box;

    @include w-max($lg) {
      padding: var(--space-m);
    }
  }
</style>
