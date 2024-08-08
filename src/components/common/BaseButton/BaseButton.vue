<template>
  <button
    :class="['button', { button_small: small, button_success: success, button_neutral: neutral }]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{ disabled?: boolean; small?: boolean; success?: boolean; neutral?: boolean }>();
</script>

<style scoped lang="scss">
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-font-light);
    font-size: var(--font-size-s);
    font-family: var(--font-manrope-semibold);
    background-color: var(--color-primary);
    padding: var(--space-s) var(--space-l);
    border-radius: 12px;
    transition: var(--transition-default);
    text-wrap: nowrap;

    @include w-max($sm) {
      padding: var(--space-xs) var(--space-s);
      font-size: var(--font-size-2xs);
    }

    &:hover {
      cursor: pointer;
      background-color: var(--color-primary-hover);
    }

    &:active {
      background-color: var(--color-primary-active);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: var(--color-third);

      &:hover,
      &:active {
        cursor: not-allowed;
        background-color: var(--color-third);
      }
    }

    &_small {
      padding: var(--space-xs) var(--space-s);
      font-size: var(--font-size-xs);
    }

    &_success {
      background-color: var(--color-success);

      &:hover {
        background-color: var(--color-success-hover);
      }
    }

    &_neutral {
      background-color: var(--color-font-secondary);

      &:hover {
        background-color: var(--color-extra-light);
      }
    }
  }
</style>
