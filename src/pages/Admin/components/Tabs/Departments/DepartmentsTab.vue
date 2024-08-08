<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <DepartmentsFilters @updateSearch="value => (search = value)" />
        <DataTable
          v-if="departments.length > 0"
          v-model="model"
          :headers="tableHeadersDepartments"
          :data="departments"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteDepartment(itemData.id)"
          @editItem="(itemData: any) => editDepartment(itemData)"
        />
        <div
          v-else
          class="tab__placeholder"
        >
          {{ $t('general.notFound') }}
        </div>
      </div>
      <Pagination
        v-if="pageCount !== 0"
        :displayedPage="filters.page + 1"
        :pageCount="pageCount"
        @updatePage="newPage => (page = newPage - 1)"
      />
    </div>

    <BaseModal ref="modal">
      <template #modal="{ close }">
        <DepartmentsForm
          :departmentModel="departmentModel"
          @executeCallback="
            (data: DepartmentModel) => {
              updateDepartment(departmentID, data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, reactive, ref, watch } from 'vue';

  import BaseModal from '@/components/common/BaseModal.vue';
  import DataTable from '@/components/DataTable/DataTable.vue';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useDepartmentsStore } from '@/stores/departments/store';
  import { useAdminHeaderMenu } from '@composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import type { IDepartmentDTO } from '@/services/departments/departments.types';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import DepartmentsFilters from './DepartmentsFilters.vue';
  import type { DepartmentModel } from './types';
  import DepartmentsForm from './components/DepartmentsForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { departments, departmentsCount } = storeToRefs(useDepartmentsStore());
  const { getDepartments, deleteDepartment, updateDepartment } = useDepartmentsStore();

  const { tableHeadersDepartments } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const departmentModel = reactive<DepartmentModel>({
    name: '',
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);
  const departmentID = ref<string>('');

  const editDepartment = (data: IDepartmentDTO) => {
    departmentID.value = data.id;
    departmentModel.name = data.name;
    modal.value?.toggleModalStatus();
  };

  const { menuItems } = useAdminHeaderMenu<IDepartmentDTO>(editDepartment, deleteDepartment);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(departmentsCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getDepartments(filters.value);
  });

  onMounted(() => {
    getDepartments(filters.value);
  });
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
