<template>
  <BaseLayout class="panel">
    <div class="panel__actions">
      <div class="panel__actions-tabs">
        <div
          v-for="item in tabs"
          :key="item.tab"
          :class="['tab', { tab__active: item.tab === currentTab }]"
          @click="chooseTab(item)"
        >
          {{ item.tabTranslate }}
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';

  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import router from '@/router';

  const route = useRoute();

  const { t } = useI18n();

  const tabs = computed(() => [
    { tab: 'Description', tabTranslate: t('profile.panel.description') },
    { tab: 'Favorites', tabTranslate: t('profile.panel.favorites') },
    { tab: 'Articles', tabTranslate: t('profile.panel.articles') },
    { tab: 'Drafts', tabTranslate: t('profile.panel.drafts') },
  ]);

  const currentTab = computed(() => String(route.name).slice(7));

  const chooseTab = (selectedTab: { tab: string; tabTranslate: string }) => {
    router.push({ name: 'Profile' + selectedTab.tab });
  };
</script>

<style scoped lang="scss">
  .panel {
    display: flex;
    flex-direction: column;

    &__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-m);

      @include w-max($xl) {
        flex-direction: column;
      }

      &-tabs {
        display: flex;
        overflow-y: auto;
        width: 100%;

        @include w-max($lg) {
          justify-content: space-between;
        }
      }

      &-controls {
        display: flex;
        align-items: center;
        gap: var(--space-xl);

        @include w-max($xl) {
          width: 100%;
          justify-content: flex-end;
        }

        &__select {
          font-size: var(--font-size-s);
          color: var(--color-font-secondary);
          cursor: pointer;
          text-wrap: nowrap;

          @include w-max($sm) {
            font-size: var(--font-size-xs);
          }
        }
      }
    }
  }

  .tab {
    padding: var(--space-m);
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: var(--transition-default);
    font-size: var(--font-size-xm);
    color: var(--color-font-secondary);
    width: fit-content;
    text-wrap: nowrap;

    @include w-max($lg) {
      width: 100%;
      text-align: center;
      padding: var(--space-s);
    }

    @include w-max($xl) {
      font-size: var(--font-size-s);
    }

    &:hover {
      color: var(--color-font-primary);
    }

    &__active {
      background: var(--color-background-primary);
      border-bottom-color: var(--color-primary-active);
      color: var(--color-font-primary);

      @include w-max($xl) {
        border-bottom-color: transparent;
        background: var(--color-background-icon);
      }
    }
  }
</style>
