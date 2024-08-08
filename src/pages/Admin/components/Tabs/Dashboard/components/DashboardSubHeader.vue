<template>
  <div
    class="subheader"
    @click="closed = !closed"
  >
    <slot></slot>
    <IconWrapper
      :icon="icons.chevronDown"
      class="subheader__icon"
      :class="{ 'subheader__icon--reversed': closed }"
    />
  </div>
  <Transition>
    <div
      v-if="!closed"
      class="subheader__content"
    >
      <div class="subheader__content__wrapper">
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';

  const closed = ref<boolean>(false);
</script>

<style scoped lang="scss">
  .v-enter-active {
    transition: all;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }

  .v-leave-active {
    transition-timing-function: ease-in-out;
  }

  .v-enter-to,
  .v-leave-from {
    max-height: 450px;
    overflow: hidden;
  }

  .v-enter-from,
  .v-leave-to {
    max-height: 0;
    overflow: hidden;
  }

  .subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--space-3xl);
    color: var(--color-font-primary);
    font-size: var(--font-size-2xl);
    line-height: 1.2;
    font-family: var(--font-manrope-medium);
    box-shadow: var(--shadow-widget);
    background-color: var(--color-background-primary);
    border-radius: var(--space-border-s);
    border: var(--border-light);
    cursor: pointer;

    &__icon {
      width: var(--space-4xl);
      height: var(--space-4xl);
      transition: 0.3s ease;
      place-self: end;

      &--reversed {
        transform: rotate(180deg);
      }

      &::v-deep(path) {
        fill: var(--color-fill);
      }
    }

    &__content {
      width: 100%;
      transition: 0.3s ease;

      &__wrapper {
        margin-top: var(--space-2xl);
      }
    }

    @include w-max($xl) {
      font-size: var(--font-size-l);

      &__icon {
        width: var(--space-2xl);
        height: var(--space-2xl);
      }
    }

    @include w-max($md) {
      font-size: var(--font-size-s);

      &__icon {
        width: var(--space-l);
        height: var(--space-l);
      }
    }

    @include w-max($xs) {
      font-size: var(--font-size-xs);

      &__icon {
        width: var(--space-m);
        height: var(--space-m);
      }
    }
  }
</style>
