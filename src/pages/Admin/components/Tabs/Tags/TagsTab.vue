<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <TagsFilters @updateSearch="value => (search = value)" />
        <DataTable
          v-if="tags.length > 0"
          v-model="model"
          :headers="tableHeadersTags"
          :data="tags"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteTag(itemData.id)"
          @editItem="(itemData: any) => editTag(itemData)"
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
        <TagsForm
          :tagModel="tagModel"
          @executeCallback="
            (data: TagModel) => {
              updateTag(tagID, data), close();
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
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { useAdminHeaderMenu } from '@composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import type { ITagDTO } from '@/services/tags/tags.types';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import TagsFilters from './TagsFilters.vue';
  import type { TagModel } from './types';
  import TagsForm from './components/TagsForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { tags, tagsCount } = storeToRefs(useTagsStore());
  const { getTags, deleteTag, updateTag } = useTagsStore();

  const { tableHeadersTags } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const tagModel = reactive<TagModel>({
    name: '',
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);
  const tagID = ref<string>('');

  const editTag = (data: ITagDTO) => {
    tagID.value = data.id;
    tagModel.name = data.name;
    modal.value?.toggleModalStatus();
  };

  const { menuItems } = useAdminHeaderMenu<ITagDTO>(editTag, deleteTag);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(tagsCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getTags(filters.value);
  });

  onMounted(() => {
    getTags(filters.value);
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
