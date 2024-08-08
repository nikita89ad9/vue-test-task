<template>
  <BaseLayout>
    <div class="faq">
      <h2 class="faq__header">{{ $t('faq.title') }}</h2>
      <FaqPageItem
        v-for="item in faqItems"
        :key="item.id"
        :isActive="activeItems.includes(item.id)"
        :title="item.title"
        :text="item.text"
        @click="toggleItem(item.id)"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import FaqPageItem from './components/FaqPageItem.vue';

  const { t } = useI18n();

  const faqItems = computed(() => [
    {
      id: 1,
      title: t('faq.generalInfo.title'),
      text: t('faq.generalInfo.text'),
    },
    {
      id: 2,
      title: t('faq.newArticle.title'),
      text: t('faq.newArticle.text'),
    },
    {
      id: 3,
      title: t('faq.isFree.title'),
      text: t('faq.isFree.text'),
    },
    {
      id: 4,
      title: t('faq.techProblems.title'),
      text: t('faq.techProblems.text'),
    },
  ]);

  const activeItems = ref<number[]>([]);

  const toggleItem = (id: number) => {
    if (activeItems.value.includes(id)) {
      activeItems.value = activeItems.value.filter(item => item !== id);
    } else {
      activeItems.value.push(id);
    }
  };
</script>

<style scoped lang="scss">
  .faq {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &__header {
      font-size: var(--font-size-2xl);
      font-family: var(--font-manrope-semibold);
      color: var(--color-font-primary);

      @include w-max($xl) {
        font-size: var(--font-size-xm);
      }
    }
  }
</style>
