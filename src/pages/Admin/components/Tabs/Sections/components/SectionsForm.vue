<template>
  <Form class="form">
    <FormInput
      v-model="sectionModel.name"
      :placeholder="$t('admin.sectionForm.name')"
      variant="contained"
    />
    <FormInput
      v-model="sectionModel.description"
      :placeholder="$t('admin.sectionForm.description')"
      variant="contained"
    />
    <FileUpload
      :initialValue="sectionModel.preview"
      @updateFile="file => (sectionModel.preview = file)"
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
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FileUpload from '@/components/FileUpload.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import type { SectionModel } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    sectionModel: SectionModel;
  }>();

  const sectionModel = ref(props.sectionModel);

  const emit = defineEmits<(e: 'executeCallback', value: FormData) => void>();

  const submit = () => {
    const formdata = new FormData();
    formdata.append('name', sectionModel.value.name);
    formdata.append('description', sectionModel.value.description);
    formdata.append('preview', sectionModel.value.preview);
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
