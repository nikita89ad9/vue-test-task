<template>
  <Form class="form">
    <InputSelect
      v-model="report.category"
      :selectOptions="reportCategories"
      :triggerPlaceholder="$t('articles.reportForm.category')"
    />
    <BaseTextArea
      v-model="report.description"
      :placeholder="$t('articles.reportForm.description')"
    />
    <BaseButton
      class="form__submit"
      @click="sendReport"
    >
      {{ $t('articles.reportForm.submit') }}
    </BaseButton>
  </Form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';

  import type { IReportData, IReportModel } from '@pages/Article/types';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseTextArea from '@/components/common/BaseTextArea/BaseTextArea.vue';
  import Form from '@/components/Form/Form.vue';
  import InputSelect from '@/components/InputSelect/InputSelect.vue';

  const props = defineProps<{
    userId: string;
    articleId: string;
  }>();

  const report = reactive<IReportModel>({
    category: { name: '', value: '' },
    description: '',
    articleId: props.articleId,
    userId: props.userId,
    date: new Date(),
  });

  const emit = defineEmits<(e: 'sendReport', value: IReportData) => void>();

  const { t } = useI18n();

  const reportCategories = reactive([
    { name: t('articles.reportForm.categories.general'), value: 'general' },
    { name: t('articles.reportForm.categories.nsfw'), value: 'nsfw' },
    { name: t('articles.reportForm.categories.harassment'), value: 'harassment' },
  ]);

  const sendReport = () => {
    const reportData = { ...report, category: report.category.value };
    emit('sendReport', reportData);
  };
</script>

<style scoped lang="scss">
  .form {
    width: 260px;
    height: 320px;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
