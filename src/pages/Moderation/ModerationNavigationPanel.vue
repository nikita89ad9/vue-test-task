<template>
  <BaseLayout class="panel">
    <div class="panel__actions">
      <div class="panel__actions-tabs">
        <div
          v-for="item in adminTabs"
          :key="item.tab"
          :class="['tab', { tab_active: isTabActive(item.tab) }]"
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

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import router from '@/router';

  interface ModerationTab {
    tab: string;
    tabTranslate: string;
  }

  const { t } = useI18n();

  const adminTabs = computed<ModerationTab[]>(() => [
    { tab: 'Articles', tabTranslate: t('moderation.tabs.articles') },
    { tab: 'Comments', tabTranslate: t('moderation.tabs.comments') },
    { tab: 'Reports', tabTranslate: t('moderation.tabs.reports') },
  ]);

  const route = useRoute();

  const currentTab = computed(() => String(route.name).slice(10));

  const isTabActive = (tab: ModerationTab['tab']) => {
    return tab === currentTab.value;
  };

  const chooseTab = (selectedTab: ModerationTab) => {
    router.push({ name: 'Moderation' + selectedTab.tab });
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

    &_active {
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
