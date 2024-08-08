<template>
  <div class="header">
    <RouterLink :to="{ name: header.route }">
      <h2 class="header__title">{{ $t(header.title) }}</h2>
    </RouterLink>
    <p class="header__text">
      {{ header.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    header: {
      title: string;
      text: string;
      route: string;
    };
  }>();
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: var(--space-s);

    &__title {
      font-size: var(--font-size-4xl);
    }

    &__text {
      font-size: var(--font-size-m);
      color: var(--color-font-secondary);
      line-height: 1.5;
    }

    @include w-max($xl) {
      &__title {
        font-size: var(--font-size-2xl);
      }

      &__text {
        font-size: var(--font-size-s);
      }
    }

    @include w-max($md) {
      &__title {
        font-size: var(--font-size-l);
      }
    }
  }
</style>
