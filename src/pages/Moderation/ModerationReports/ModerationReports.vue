<template>
  <div class="moderation-reports">
    <ModerationSelectionPanel
      :checkboxTitle="$t('moderation.comments.selectAll')"
      :checkboxValue="allReportsSelected"
      :counter="reportsCount"
      :counterPlaceholder="$t('moderation.comments.total')"
      @updateValue="selectAll"
    >
      <template #search>
        <BaseInput
          v-model="search"
          :placeholder="$t('moderation.reports.panel.search')"
        >
          <template #prepend-icon>
            <IconWrapper :icon="icons.search" />
          </template>
          <template #append-icon="{ clear }">
            <IconWrapper
              :icon="icons.close"
              class="clear"
              @click="clear()"
            />
          </template>
        </BaseInput>
      </template>
      <template #filters>
        <div class="moderation-reports__filters">
          <ModerationSelect
            v-model="dateValue"
            :options="dateOptions"
            iconName="calendar"
          />
          <ModerationSelect
            v-model="sortValue"
            :options="sortOptions"
            iconName="sort"
          />
        </div>
      </template>
    </ModerationSelectionPanel>
    <div
      v-if="tableContentModeration.length"
      class="moderation-reports__wrapper"
    >
      <DataTable
        v-model="model"
        :headers="tableHeaders"
        :data="tableContentModeration"
        :sortOrder="sortOrder"
        :sortValue="sortVal"
        :menuItems="menuItems"
        markAsResolved
        @deleteItem="(itemData: any) => console.log(itemData.id, 'deleting')"
        @editItem="(itemData: any) => console.log(itemData, 'updating')"
      />
    </div>
    <BasePlaceholder
      v-else
      :placeholderText="$t('general.notFound')"
    >
    </BasePlaceholder>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import DataTable from '@components/DataTable/DataTable.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import type { HeaderMenu } from '@/components/DataTable/types';
  import type { HeaderMenuUnion } from '@/components/DataTable/types';
  import type { TableHeader } from '@/components/DataTable/types';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useModerationOptions } from '@/composables/useModerationOptions';
  import { icons } from '@/utils/icons';
  import { tableContentModeration } from './data';
  import ModerationSelect from '../ModerationSelect.vue';
  import ModerationSelectionPanel from '../ModerationSelectionPanel.vue';

  const { t } = useI18n();

  const { sortValue, sortOptions, dateValue, dateOptions } = useModerationOptions();

  const search = ref('');

  const allReportsSelected = ref(false);
  const reportsCount = 1;

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const tableHeaders = computed<TableHeader[]>(() => [
    {
      key: 'createdAt',
      text: t('table.tableHeader.created'),
    },
    {
      key: 'category',
      text: t('table.tableHeader.category'),
    },
    {
      key: 'user',
      text: t('table.tableHeader.submittedBy'),
    },
    {
      key: 'description',
      text: t('table.tableHeader.description'),
    },
  ]);

  const menuItems = computed<HeaderMenu<HeaderMenuUnion>[]>(() => [
    {
      icon: icons.views,
      text: t('moderation.reports.viewArticle'),
      name: 'viewArticle',
      action: itemData => alert(itemData),
    },
    {
      icon: icons.block,
      text: t('moderation.reports.rejectArticle'),
      name: 'blockArticle',
      action: itemData => alert(itemData),
    },
    {
      icon: icons.block,
      text: t('moderation.reports.blockUser'),
      name: 'blockAuthor',
      action: itemData => alert(itemData),
    },
  ]);

  const selectAll = () => {
    allReportsSelected.value = !allReportsSelected.value;
  };
</script>

<style scoped lang="scss">
  .moderation-reports {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    &__filters {
      display: flex;
      align-items: flex-end;
      align-self: flex-end;
      margin-left: auto;
      gap: var(--space-s);
    }
  }

  .clear {
    width: var(--space-m);
    height: var(--space-m);
  }
</style>
