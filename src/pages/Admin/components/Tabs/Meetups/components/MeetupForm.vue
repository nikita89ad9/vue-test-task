<template>
  <Form class="form">
    <FormInput
      v-model="meetupModel.title"
      :placeholder="$t('admin.meetupForm.title')"
      variant="contained"
    />
    <FormInput
      v-model="meetupModel.description"
      :placeholder="$t('admin.meetupForm.description')"
      variant="contained"
    />
    <FormInput
      v-model="meetupModel.url"
      :placeholder="$t('admin.meetupForm.url')"
      variant="contained"
    />
    <FormInput
      v-model="meetupModel.participants"
      :placeholder="$t('admin.meetupForm.participants')"
      variant="contained"
    />
    <InputSelect
      v-if="visibilityOptions.length"
      v-model="selectedVisibility"
      :selectOptions="visibilityOptions"
      :triggerPlaceholder="$t('admin.meetupForm.isPublished')"
    />

    <InputSelect
      v-if="sectionsOptions.length"
      v-model="selectedValue"
      :selectOptions="sectionsOptions"
      :triggerPlaceholder="$t('admin.meetupForm.section')"
    />
    <TagsSelect
      v-model="meetupModel.tags"
      :options="tags"
      :placeholder="$t('editor.select.placeholder')"
    />
    <FileUpload
      :initialValue="meetupModel.preview"
      @updateFile="file => (meetupModel.preview = file)"
    />

    <BaseButton
      class="form_submit"
      @click="submit"
    >
      {{ t('auth.submit') }}
    </BaseButton>
  </Form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FileUpload from '@/components/FileUpload.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import InputSelect from '@/components/InputSelect/InputSelect.vue';
  import TagsSelect from '@/components/TagsSelect/TagsSelect.vue';
  import type { IAuthDTO } from '@/services/auth/auth.types';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import type { ITagDTO } from '@/services/tags/tags.types';
  import type { MeetupModel } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    user: IAuthDTO | undefined;
    sections: ISectionDTO[];
    tags: ITagDTO[];
    meetupModel: MeetupModel;
  }>();

  const emit = defineEmits<(e: 'executeCallback', value: FormData) => void>();

  const meetupModel = ref(props.meetupModel);

  const sectionsOptions = computed(() => {
    if (props.sections) {
      return props.sections.map(section => {
        const option = {} as { name: string; value: string };
        option.name = section.name;
        option.value = section.name;
        return option;
      });
    } else return [];
  });

  const visibilityOptions = ref([
    {
      name: t('admin.meetupForm.state.published'),
      value: 'true',
    },
    {
      name: t('admin.meetupForm.state.hidden'),
      value: 'false',
    },
  ]);

  const initialVisibility = computed(() => {
    const current = props.meetupModel.isPublished;
    if (current !== '') {
      return {
        name:
          current === 'true'
            ? t('admin.meetupForm.state.published')
            : t('admin.meetupForm.state.hidden'),
        value: current,
      };
    } else {
      return { name: '', value: '' };
    }
  });

  const selectedVisibility = ref(initialVisibility.value);

  const initialSection = computed(() => {
    if (props.meetupModel.sectionId !== '') {
      const item = props.sections.find(
        item => item.id === props.meetupModel.sectionId
      ) as ISectionDTO;
      return { name: item.name, value: item.name };
    } else {
      return { name: '', value: '' };
    }
  });

  const selectedValue = ref(initialSection.value);

  const sectionID = computed(() => {
    const item = props.sections.find(item => item.name === selectedValue.value.name);
    return item ? item.id : '';
  });

  const submit = () => {
    const tags = JSON.parse(JSON.stringify(meetupModel.value.tags));
    const formdata = new FormData();

    formdata.append('title', meetupModel.value.title);
    formdata.append('description', meetupModel.value.description);
    formdata.append('url', meetupModel.value.url);
    formdata.append('isPublished', meetupModel.value.isPublished);
    formdata.append('sectionId', sectionID.value);
    formdata.append('participants', meetupModel.value.participants);
    formdata.append('preview', meetupModel.value.preview);
    if (props.user) {
      formdata.append('authorId', props.user.id);
    }
    tags.forEach((tag: { name: string; id: string }) => {
      formdata.append('tags', tag.name);
    });
    emit('executeCallback', formdata);
  };
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &_submit {
      grid-column: 2;
    }

    :deep(.input) {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .icon {
      width: var(--space-m);
      height: var(--space-m);

      :deep(path) {
        fill: var(--color-font-secondary);
        cursor: pointer;
        transition: var(--transition-default);
      }

      &:hover {
        :deep(path) {
          fill: var(--color-font-primary);
        }
      }
    }
  }
</style>
