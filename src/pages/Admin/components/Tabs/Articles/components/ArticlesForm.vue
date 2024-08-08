<template>
  <Form class="form">
    <FormInput
      v-model="articleModel.title"
      :placeholder="$t('admin.articleForm.title')"
      variant="contained"
    />
    <FormInput
      v-model="articleModel.description"
      :placeholder="$t('admin.articleForm.description')"
      variant="contained"
    />
    <FormInput
      v-model="articleModel.content"
      :placeholder="$t('admin.articleForm.content')"
      variant="contained"
    />
    <InputSelect
      v-if="sectionsOptions.length"
      v-model="selectedValue"
      :selectOptions="sectionsOptions"
      :triggerPlaceholder="$t('admin.articleForm.section')"
    />
    <TagsSelect
      v-model="articleModel.tags"
      :options="tags"
      :placeholder="tagsSelectPlaceholder"
    />
    <FileUpload
      :initialValue="articleModel.preview"
      @updateFile="file => (articleModel.preview = file)"
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
  import type { ArticleModel } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    user: IAuthDTO | undefined;
    sections: ISectionDTO[];
    tags: ITagDTO[];
    articleModel: ArticleModel;
  }>();

  const emit = defineEmits<(e: 'executeCallback', value: FormData) => void>();

  const articleModel = ref(props.articleModel);

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

  const initialSection = computed(() => {
    if (props.articleModel.sectionId !== '') {
      const item = props.sections.find(
        item => item.id === props.articleModel.sectionId
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

  const tagsSelectPlaceholder = computed(() => {
    if (articleModel.value.tags.length) {
      return `${t('editor.select.selected')}: ${articleModel.value.tags.length}`;
    } else {
      return t('editor.select.placeholder');
    }
  });

  const submit = () => {
    const tags = JSON.parse(JSON.stringify(articleModel.value.tags));
    const formdata = new FormData();

    formdata.append('title', articleModel.value.title);
    formdata.append('description', articleModel.value.description);
    formdata.append('isPublished', 'false');
    formdata.append('sectionId', sectionID.value);
    formdata.append('content', articleModel.value.content);
    formdata.append('preview', articleModel.value.preview);
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
