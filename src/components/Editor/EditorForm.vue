<template>
  <BaseLayout class="layout_spaced">
    <div class="editor-form">
      <div class="editor-form__preview">
        <FileUpload
          :initialValue="articleModel.preview"
          @updateFile="file => (articleModel.preview = file)"
        />
      </div>
      <Form class="editor-form__info">
        <FormInput
          v-model="articleModel.title"
          :placeholder="$t('editor.controls.form.title')"
          variant="contained"
        />
        <FormInput
          v-model="articleModel.description"
          :placeholder="$t('editor.controls.form.description')"
          variant="contained"
        />
        <InputSelect
          v-if="sectionsOptions.length"
          v-model="selectedValue"
          :selectOptions="sectionsOptions"
          :triggerPlaceholder="$t('editor.controls.form.section')"
        />
        <TagsSelect
          v-model="articleModel.tags"
          :options="tags"
          :placeholder="tagsSelectPlaceholder"
        />
      </Form>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import Form from '@components/Form/Form.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import BaseLayout from '../common/BaseLayout/BaseLayout.vue';
  import FileUpload from '../FileUpload.vue';
  import InputSelect from '../InputSelect/InputSelect.vue';
  import TagsSelect from '../TagsSelect/TagsSelect.vue';
  import type { ITagsSelectProps } from '../TagsSelect/types';

  interface ArticleModel {
    title: string;
    description: string;
    authorId: string;
    sectionId: string;
    preview: File | string;
    tags: ITagsSelectProps[];
  }

  const { user } = storeToRefs(useUserStore());

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { tags } = storeToRefs(useTagsStore());
  const { getTags } = useTagsStore();

  const { t } = useI18n();

  const props = defineProps<{
    modelValue: ArticleModel;
  }>();

  const sectionsOptions = computed(() => {
    if (sections.value) {
      return sections.value.map(section => {
        const option = {} as { name: string; value: string };
        option.name = section.name;
        option.value = section.name;
        return option;
      });
    } else return [];
  });

  const selectedValue = ref({ name: '', value: '' });

  const sectionID = computed(() => {
    const item = sections.value.find(item => item.name === selectedValue.value.name);
    return item ? item.id : '';
  });

  const articleModel = ref<ArticleModel>(props.modelValue);

  const tagsSelectPlaceholder = computed(() => {
    if (articleModel.value.tags.length) {
      return `${t('editor.select.selected')}: ${articleModel.value.tags.length}`;
    } else {
      return t('editor.select.placeholder');
    }
  });

  watch(sectionID, () => {
    articleModel.value.sectionId = sectionID.value;
  });

  onMounted(() => {
    getTags();
    getSections();
    articleModel.value.authorId = user.value?.id as string;
    articleModel.value.sectionId = sectionID.value;
    articleModel.value.tags = [];
  });
</script>

<style scoped lang="scss">
  .editor-form {
    display: flex;
    width: 100%;
    height: 400px;
    gap: var(--space-xl);
    padding: var(--space-3xl) 0;

    &__info {
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
      width: 100%;
    }

    &__preview {
      position: relative;
    }

    &__tags {
      width: 100%;
    }

    @include w-max($xl) {
      flex-direction: column;
      gap: 0;
      padding: 0;
      height: auto;
    }
  }

  .layout_spaced {
    margin-bottom: var(--space-xl);
  }
</style>
