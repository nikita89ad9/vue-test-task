<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <ProfessionalLevelsFilters @updateSearch="value => (search = value)" />
        <DataTable
          v-if="professionalLevels.length > 0"
          v-model="model"
          :headers="tableHeadersProfessionalLevels"
          :data="professionalLevels"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteProfessionalLevel(itemData.id)"
          @editItem="(itemData: any) => editProfessionalLevel(itemData)"
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
        <ProfessionalLevelsForm
          :professionalLevelModel="professionalLevelModel"
          @executeCallback="
            (data: ProfessionalLevelModel) => {
              updateProfessionalLevel(professionalLevelID, data), close();
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
  import { useProfessionalLevelsStore } from '@/stores/professionalLevelsStore/store';
  import { useAdminHeaderMenu } from '@composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import type { IProfessionalLevelDTO } from '@/services/professionalLevels/professionalLevels.types';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import ProfessionalLevelsFilters from './ProfessionalLevelsFilters.vue';
  import type { ProfessionalLevelModel } from './types';
  import ProfessionalLevelsForm from './components/ProfessionalLevelsForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { professionalLevels, professionalLevelsCount } = storeToRefs(useProfessionalLevelsStore());
  const { getProfessionalLevels, deleteProfessionalLevel, updateProfessionalLevel } =
    useProfessionalLevelsStore();

  const { tableHeadersProfessionalLevels } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const professionalLevelModel = reactive<ProfessionalLevelModel>({
    name: '',
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);
  const professionalLevelID = ref<string>('');

  const editProfessionalLevel = (data: IProfessionalLevelDTO) => {
    professionalLevelID.value = data.id;
    professionalLevelModel.name = data.name;
    modal.value?.toggleModalStatus();
  };

  const { menuItems } = useAdminHeaderMenu<IProfessionalLevelDTO>(
    editProfessionalLevel,
    deleteProfessionalLevel
  );

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(professionalLevelsCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getProfessionalLevels(filters.value);
  });

  onMounted(() => {
    getProfessionalLevels(filters.value);
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
