<template>
  <button
    :class="[
      'moderation-button',
      { 'moderation-button_approve': approve },
      { 'moderation-button_reject': reject },
    ]"
  >
    <span class="moderation-button__icon">
      <slot name="icon"></slot>
    </span>
    <slot name="text"></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    approve?: boolean;
    reject?: boolean;
  }>();
</script>

<style scoped lang="scss">
  .moderation-button {
    width: 100%;
    max-width: 140px;
    height: 40px;
    display: flex;
    flex-wrap: nowrap;
    text-wrap: nowrap;
    gap: var(--space-xs);
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    color: var(--color-font-secondary);
    font-size: var(--font-size-xs);
    padding: var(--space-xs) var(--space-s);
    transition: var(--transition-even);

    &:hover {
      filter: brightness(1.05);
    }

    &_approve {
      background-color: #d3ffde;
    }

    &_reject {
      background-color: #ffbfbf;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--space-m);
      width: var(--space-m);
    }

    @include w-max($sm) {
      font-size: var(--font-size-2xs);
    }
  }
</style>
