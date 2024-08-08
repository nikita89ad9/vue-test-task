<template>
  <div class="auth">
    <div class="auth__left-side">
      <div class="auth__left-side__container">
        <h1 class="auth__left-side__header">Loreinn</h1>
        <AuthIconsRaw />
        <AuthPostfix />
      </div>
    </div>
    <div class="auth__right-side">
      <div class="auth__right-side__container">
        <InnoLogo class="auth__right-side__container__logo" />
        <h2 class="auth__right-side__greeting">
          {{ $t('general.welcome') }}
          <span class="auth__right-side__greeting--loreinn"> LoreInn </span>
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import InnoLogo from '@/assets/icons/InnoLogo.vue';
  import AuthIconsRaw from './AuthIconsRaw.vue';
  import AuthPostfix from './AuthPostfix.vue';
</script>

<style scoped lang="scss">
  .auth {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include w-max($md) {
      grid-template-columns: 1fr;
    }

    &__left-side {
      background-image: url('/office-photo.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-gradient-primary);
      }

      &__container {
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-around;
        padding: var(--space-xl);
      }

      &__header {
        color: var(--color-font-light);
        font-family: var(--font-manrope-medium);
        font-size: var(--font-size-8xl);
        letter-spacing: var(--letter-spacing-s);
      }

      @include w-max($md) {
        display: none;
      }
    }

    &__right-side {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background-primary);

      &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 0 var(--space-xl);

        &__logo {
          &:deep(.text) {
            fill: var(--color-font-primary);
          }
        }

        @include w-max($xs) {
          &__logo {
            width: 200px;
            height: auto;
            margin-bottom: var(--space-m);
          }
        }
      }

      &__greeting {
        font-family: var(--font-manrope-regular);
        color: var(--color-font-primary);
        font-size: var(--font-size-4xl);
        letter-spacing: var(--letter-spacing-m);
        padding: var(--space-m) 0;
        text-align: center;
        margin-bottom: var(--space-xl);

        @include w-max($lg) {
          font-size: var(--font-size-2xl);
        }

        @include w-max($xs) {
          display: none;
        }

        &--loreinn {
          color: var(--color-font-secondary);
        }
      }
    }
  }
</style>
