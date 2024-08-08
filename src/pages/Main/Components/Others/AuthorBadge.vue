<template>
  <div class="badge">
    <h2 class="badge__header">
      <p>{{ $t('general.wantToBeAnAuthor') }}</p>
      <RouterLink :to="{ name: 'Editor' }">{{ $t('general.startNow') }}</RouterLink>
    </h2>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
  .badge {
    background-image: url('https://www.royalshell.com/wp-content/uploads/2021/12/H1-Creative-Ways-to-Find-Laptop-Sun-Shade-and-Work-from-the-Beach.jpg');
    background-size: cover;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: var(--space-xl);

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-s);
      font-family: var(--font-manrope-semibold);
      z-index: 1;

      p {
        color: var(--color-font-light);
      }

      a {
        color: var(--color-font-light);
        text-decoration: underline;
        text-wrap: nowrap;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-primary-transparent);
    }

    @include w-max($xl) {
      height: 100px;

      &__header {
        p,
        a {
          font-size: var(--space-xl);
        }
      }
    }

    @include w-max($md) {
      height: 80px;

      &__header {
        p,
        a {
          font-size: var(--space-xl);
        }
      }
    }

    @include w-max($md) {
      height: 70px;

      &__header {
        p,
        a {
          font-size: var(--space-ml);
        }
      }
    }

    @include w-max($sm) {
      &__header {
        display: flex;
        flex-direction: column;

        p,
        a {
          font-size: var(--space-m);
        }
      }
    }

    @include w-max($xs) {
      height: 60px;

      &__header {
        p,
        a {
          font-size: var(--space-s);
        }
      }
    }
  }
</style>
