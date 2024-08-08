<template>
  <div class="postfix">
    <p class="postfix__text">{{ $t('auth.postfix.chatWithCollegues') }}</p>
    <div class="postfix__bullet"></div>
    <p class="postfix__text">{{ $t('auth.postfix.relevantArticles') }}</p>
    <div class="postfix__bullet"></div>
    <p class="postfix__text">{{ $t('auth.postfix.helpfulArticles') }}</p>
  </div>
</template>

<style scoped lang="scss">
  .postfix {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    align-items: center;
    justify-content: center;

    &__bullet {
      background-color: white;
      border-radius: 50%;
      width: var(--space-m);
      height: var(--space-m);
    }

    &__text {
      font-family: var(--font-manrope-semibold);
      color: var(--color-font-light);
      font-size: var(--font-size-4xl);
      text-align: center;

      @include w-max($xl) {
        font-size: var(--font-size-2xl);
      }

      @include w-max($lg) {
        font-size: var(--font-size-xl);
        text-align: center;
      }
    }
  }
</style>
