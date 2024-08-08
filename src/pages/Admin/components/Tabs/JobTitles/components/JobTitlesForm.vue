<template>
  <Form class="form">
    <FormInput
      v-model="jobTitleModel.name"
      :placeholder="$t('admin.jobTitleForm.name')"
      variant="contained"
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
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import type { JobTitleModel } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    jobTitleModel: JobTitleModel;
  }>();

  const jobTitleModel = ref(props.jobTitleModel);

  const emit = defineEmits<(e: 'executeCallback', value: JobTitleModel) => void>();

  const submit = () => {
    emit('executeCallback', jobTitleModel.value);
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
