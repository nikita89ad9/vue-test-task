<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <SubscriptionsFilters />
        <DataTable
          v-if="adminTableContent.subscriptions.length > 0"
          v-model="model"
          :headers="tableHeadersSubscriptions"
          :data="adminTableContent.subscriptions"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
        />
        <div
          v-else
          class="tab__placeholder"
        >
          {{ $t('general.notFound') }}
        </div>
      </div>
      <Pagination
        v-model:displayedPage="page"
        :pageCount="2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { adminTableContent } from '@pages/Admin/consts';
  import DataTable from '@/components/DataTable/DataTable.vue';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useAdminHeaderMenu } from '@/composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import SubscriptionsFilters from './SubscriptionsFilters.vue';

  const { tableHeadersSubscriptions } = useAdminTable();

  const editSubscription = () => {};
  const deleteSubscription = () => {};
  const { menuItems } = useAdminHeaderMenu(editSubscription, deleteSubscription);

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);
  const page = ref<number>(2);
</script>

<style lang="scss" scoped>
  .tab {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__table {
      height: calc(100% - var(--space-4xl) - var(--space-m));
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &__content {
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size-m);
      color: var(--color-font-secondary);
    }
  }
</style>
