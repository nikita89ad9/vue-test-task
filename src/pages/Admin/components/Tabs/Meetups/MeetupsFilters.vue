<template>
  <div class="wrapper">
    <div class="filters">
      <BaseInput
        v-model="search"
        :placeholder="$t('general.search')"
        @update:modelValue="value => emit('updateSearch', value)"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
        <template #append-icon="{ clear }">
          <IconWrapper
            :icon="icons.close"
            class="filters__close"
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <BaseModal>
      <template #trigger>
        <BaseButton>
          {{ t('admin.tabs.buttons.meetup') }}
        </BaseButton>
      </template>
      <template #modal="{ close }">
        <MeetupForm
          :user="user"
          :tags="tags"
          :sections="sections"
          :meetupModel="meetupModel"
          @executeCallback="
            (data: IMeetupDTOCreateReq) => {
              addMeetup(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useMeetupsStore } from '@/stores/meetupsStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import type { IMeetupDTOCreateReq } from '@services/meetups/meetups.types';
  import type { IAuthDTO } from '@/services/auth/auth.types';
  import type { ITagDTO } from '@/services/tags/tags.types';
  import { icons } from '@/utils/icons';
  import type { MeetupModel } from './types';
  import MeetupForm from './components/MeetupForm.vue';

  defineProps<{
    user: IAuthDTO | undefined;
    tags: ITagDTO[];
  }>();

  const emit = defineEmits<(e: 'updateSearch', value: string) => void>();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { addMeetup } = useMeetupsStore();

  const { t } = useI18n();

  const search = ref<string>('');

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

  onMounted(() => {
    getSections();
  });
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filters {
      display: flex;
      align-items: center;
      gap: var(--space-m);
      margin-right: var(--space-m);

      &__clear {
        width: var(--space-m);
        height: var(--space-m);
      }

      @include w-max($sm) {
        overflow-x: auto;
      }
    }
  }
</style>
