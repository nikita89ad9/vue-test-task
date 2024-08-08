<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <SectionsFilters
          v-if="loaded"
          :sections="sections"
          @updateSearch="value => (search = value)"
        />
        <DataTable
          v-if="sectionsCount > 0"
          v-model="model"
          :headers="tableHeadersSections"
          :data="sections"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteSection(itemData.id)"
          @editItem="(itemData: any) => editSection(itemData)"
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
        <SectionsForm
          :sections="sections"
          :sectionModel="sectionModel"
          @executeCallback="
            (data: FormData) => {
              updateSection(sectionID, data), close();
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
  import { useSectionsStore } from '@stores/sectionsStore/store';
  import { useAdminHeaderMenu } from '@/composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import SectionsFilters from './SectionsFilters.vue';
  import type { SectionModel } from './types';
  import SectionsForm from './components/SectionsForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { sections, sectionsCount, loaded } = storeToRefs(useSectionsStore());
  const { getSections, deleteSection, updateSection } = useSectionsStore();

  const { tableHeadersSections } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const sectionModel = reactive<SectionModel>({
    name: '',
    description: '',
    preview: '',
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const sectionID = ref<string>('');

  const editSection = (data: ISectionDTO) => {
    sectionID.value = data.id;
    sectionModel.name = data.name;
    sectionModel.description = data.description;
    sectionModel.preview = data.preview.mediaUrl;
    modal.value?.toggleModalStatus();
  };

  const { menuItems } = useAdminHeaderMenu(editSection, deleteSection);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(sectionsCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getSections(filters.value);
  });

  onMounted(() => {
    getSections(filters.value);
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
