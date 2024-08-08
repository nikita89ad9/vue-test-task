<template>
  <ul class="icons">
    <li class="icons__item">
      <IconWrapper
        class="icons__item__container"
        :icon="icons.authIcons.newspaper"
      />
    </li>
    <li class="icons__item">
      <IconWrapper
        class="icons__item__container"
        :icon="icons.authIcons.doc"
      />
    </li>
    <li class="icons__item">
      <IconWrapper
        class="icons__item__container"
        :icon="icons.authIcons.chat"
      />
    </li>
    <li class="icons__item">
      <IconWrapper
        class="icons__item__container"
        :icon="icons.authIcons.meetup"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import IconWrapper from '@components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
</script>

<style scoped lang="scss">
  .icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-xl);

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      border: var(--border-icon);
      border-radius: 50%;
      background-color: var(--color-background-icon);
      width: 100px;
      height: 100px;

      &__container {
        width: 70px;
        height: 70px;
      }

      @include w-max($xl) {
        width: 70px;
        height: 70px;

        &__container {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
</style>
