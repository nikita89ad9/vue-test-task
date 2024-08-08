<template>
  <BaseLayout class="subscriptions">
    <h1>{{ t('subs.getAccess') }}</h1>
    <ul class="subscriptions__prons-list">
      <li
        v-for="pron in prons"
        :key="pron"
        class="subscriptions__prons-list__item"
      >
        {{ pron }}
      </li>
    </ul>

    <div class="subscriptions__cards">
      <SubscriptionCard
        v-for="rate in rates"
        :id="rate.id"
        :key="rate.label"
        :label="rate.label"
        :price="rate.price"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import { useSubscriptionStore } from '@/stores/subscriptionStore/store';
  import SubscriptionCard from './components/SubscriptionCard.vue';

  const { rates } = useSubscriptionStore();

  const { t } = useI18n();

  const prons = computed(() => [
    t('subs.unlimFavs'),
    t('subs.activityNotions'),
    t('subs.liveMeetups'),
    t('subs.subs'),
    t('subs.unrestComments'),
  ]);
</script>

<style scoped lang="scss">
  .subscriptions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 100%;

    @include w-max($lg) {
      height: fit-content;
      gap: var(--space-xl);
    }

    h1 {
      align-self: center;
      font-size: var(--font-size-3xl);
      font-family: var(--font-manrope-semibold);
      color: var(--color-font-primary);
      margin-bottom: var(--space-4xl);

      @include w-max($lg) {
        font-size: var(--font-size-2xl);
        margin-bottom: 0;
      }

      @include w-max($sm) {
        font-size: var(--font-size-l);
        margin-bottom: 0;
      }
    }

    &__prons-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-l);
      margin-left: var(--space-xl);
      color: var(--color-font-primary);
      margin-bottom: var(--space-4xl);

      li {
        list-style-type: disc;
        line-height: 1.2;
      }

      @include w-max($xl) {
        font-size: var(--font-size-m);
      }
    }

    &__cards {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 70%;
      margin: auto;

      @include w-max($xxl) {
        gap: var(--space-l);
        width: 100%;
      }

      @include w-max($lg) {
        flex-direction: column;
        align-items: start;
        justify-content: start;
        gap: var(--space-l);
        width: 100%;
      }
    }

    &__button {
      font-size: var(--space-xl);
      width: fit-content;
      align-self: flex-end;
    }
  }
</style>
