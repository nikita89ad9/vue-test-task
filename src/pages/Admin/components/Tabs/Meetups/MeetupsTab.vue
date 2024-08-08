<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <MeetupsFilters
          :user="user"
          :tags="tags"
          @updateSearch="value => (search = value)"
        />
        <DataTable
          v-if="formattedMeetups.length"
          v-model="model"
          :headers="tableHeadersMeetups"
          :data="formattedMeetups"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="(itemData: any) => deleteMeetup(itemData.id)"
          @editItem="(itemData: any) => editMeetup(itemData)"
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
        <MeetupForm
          :user="user"
          :tags="tags"
          :sections="sections"
          :meetupModel="meetupModel"
          @executeCallback="
            (data: FormData) => {
              updateMeetup(meetupID, data), close();
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

  import type { FormattedMeetup } from '@/pages/Admin/types';
  import BaseModal from '@/components/common/BaseModal.vue';
  import DataTable from '@/components/DataTable/DataTable.vue';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useMeetupsStore } from '@/stores/meetupsStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import { useAdminHeaderMenu } from '@/composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import MeetupsFilters from './MeetupsFilters.vue';
  import type { MeetupModel } from './types';
  import MeetupForm from './components/MeetupForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { meetups, meetupsCount, selectedMeetup } = storeToRefs(useMeetupsStore());
  const { getMeetups, getMeetup, updateMeetup, deleteMeetup } = useMeetupsStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const { tableHeadersMeetups } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const meetupModel = reactive<MeetupModel>({
    title: '',
    description: '',
    url: '',
    authorId: '',
    sectionId: '',
    preview: '',
    tags: [],
    participants: '',
    isPublished: '',
  });

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const meetupID = ref<string>('');

  const { user } = storeToRefs(useUserStore());

  const editMeetup = async (data: FormattedMeetup) => {
    await getMeetup(data.id);
    if (selectedMeetup.value) {
      meetupID.value = selectedMeetup.value.id;
      meetupModel.title = selectedMeetup.value.title;
      meetupModel.description = selectedMeetup.value.description;
      meetupModel.url = selectedMeetup.value.url;
      meetupModel.participants = selectedMeetup.value.participants;
      meetupModel.isPublished = selectedMeetup.value.isPublished;
      meetupModel.sectionId = selectedMeetup.value.sectionId;
      meetupModel.tags = selectedMeetup.value.tags;
      meetupModel.preview = selectedMeetup.value.preview.mediaUrl;
      modal.value?.toggleModalStatus();
    }
  };

  const formattedMeetups = computed<FormattedMeetup[]>(() => {
    return meetups.value.map(meetup => {
      const formatted = {} as FormattedMeetup;
      formatted.id = meetup.id;
      formatted.title = meetup.title;
      formatted.authorName = meetup.author.name
        ? `${meetup.author.name} ${meetup.author.surname}`
        : '-';
      formatted.authorEmail = meetup.author.email;
      formatted.status = meetup.isPublished ? 'Published' : 'Not published';
      formatted.created = meetup.createdAt;
      const section = sections.value.find(section => section.id === meetup.sectionId);
      formatted.section = section?.name as string;
      return formatted;
    });
  });

  const { menuItems } = useAdminHeaderMenu(editMeetup, deleteMeetup);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(meetupsCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getMeetups(filters.value);
  });

  onMounted(() => {
    getMeetups(filters.value);
    getSections();
    getTags();
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
