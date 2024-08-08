<template>
  <div class="side">
    <RouterLink
      v-for="link in sideBarLinks"
      :key="link.name"
      class="side__link"
      :to="link.route"
      activeClass="side__link--active"
    >
      {{ link.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { sideBarLinks } from '../sideBarItems';
</script>

<style scoped lang="scss">
  .side {
    display: grid;
    grid-template-columns: 1fr;
    width: 25%;
    height: fit-content;

    @include w-max($lg) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      width: 100%;
    }

    &__link {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-left: 3px solid transparent;
      background: var(--color-background-primary);
      color: var(--color-font-secondary);
      padding: var(--space-s) var(--space-l);
      font-size: var(--font-size-xl);
      font-family: var(--font-manrope-medium);
      transition: var(--transition-default);

      @include w-max($lg) {
        border-bottom: 3px solid transparent;
        border-left: 0;
        justify-content: center;
        height: fit-content;
        padding: var(--space-l);
        font-size: var(--font-size-s);
      }

      @include w-max($sm) {
        font-size: var(--font-size-2xs);
      }

      &:deep(path) {
        fill: var(--color-font-secondary);
      }

      &:hover {
        border-color: var(--color-primary);
        background: var(--color-background-third);
      }

      &--active {
        color: var(--color-primary);
        border-color: var(--color-primary);
        background: var(--color-background-third);

        &:deep(path) {
          fill: var(--color-primary);
        }
      }
    }
  }
</style>
