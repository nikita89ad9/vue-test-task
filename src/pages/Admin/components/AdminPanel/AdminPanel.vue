<template>
  <BaseLayout class="panel">
    <div class="panel__actions">
      <div class="panel__actions-tabs">
        <Tab
          v-for="item in adminTabs"
          :key="item.tab"
          :active="isTabActive(item.tab)"
          @click="chooseTab(item)"
        >
          {{ item.tabTranslate }}
        </Tab>
      </div>
      <div
        v-if="route.name !== 'AdminDashboard'"
        class="panel__actions-controls"
      >
        <Select
          v-model="select"
          :options="amountOptions"
          @update:modelValue="chooseElementsAmount"
        >
          <span class="panel__actions-controls__select">
            {{ t('general.items') }}: {{ select.value }}
          </span>
        </Select>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';

  import Tab from '@pages/Admin/components/Tab/Tab.vue';
  import { amountOptions } from '@pages/Admin/consts';
  import type { AdminTab } from '@pages/Admin/types';
  import Select from '@/components/Select/Select.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import router from '@/router';

  const route = useRoute();

  const { t } = useI18n();

  const emits = defineEmits<{
    amountPick: [amount: { name: string; value: string }];
    setConfigurable: [configurable: boolean];
  }>();

  const select = ref(amountOptions[0]);

  const adminTabs = computed<AdminTab[]>(() => [
    { tab: 'Users', tabTranslate: t('admin.tabs.users'), configurable: true },
    { tab: 'Articles', tabTranslate: t('admin.tabs.articles'), configurable: true },
    { tab: 'Meetups', tabTranslate: t('admin.tabs.meetups'), configurable: true },
    { tab: 'Sections', tabTranslate: t('admin.tabs.sections'), configurable: true },
    { tab: 'Tags', tabTranslate: t('admin.tabs.tags'), configurable: true },
    { tab: 'Departments', tabTranslate: t('admin.tabs.departments'), configurable: true },
    { tab: 'JobTitles', tabTranslate: t('admin.tabs.jobTitles'), configurable: true },
    {
      tab: 'ProfessionalLevels',
      tabTranslate: t('admin.tabs.professionalLevels'),
      configurable: true,
    },
    { tab: 'Subscriptions', tabTranslate: t('admin.tabs.subscriptions'), configurable: true },
    { tab: 'Faq', tabTranslate: t('admin.tabs.faq'), configurable: true },
    { tab: 'Dashboard', tabTranslate: t('admin.tabs.dashboard'), configurable: false },
  ]);

  const currentTab = computed(() => String(route.name).slice(5));

  const isTabActive = (tab: AdminTab['tab']) => {
    return tab === currentTab.value;
  };

  const chooseTab = (selectedTab: AdminTab) => {
    router.push({ name: 'Admin' + selectedTab.tab });
    emits('setConfigurable', selectedTab.configurable);
  };

  const chooseElementsAmount = () => {
    emits('amountPick', select.value);
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
</style>
