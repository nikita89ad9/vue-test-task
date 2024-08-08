import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useEditorTimeline = () => {
  const { t } = useI18n();

  const timelineItems = computed(() => [
    { id: 1, text: t(`editor.controls.stepCreate`) },
    { id: 2, text: t(`editor.controls.stepSettings`) },
    { id: 3, text: t(`editor.controls.stepPublish`) },
  ]);

  return { timelineItems };
};
