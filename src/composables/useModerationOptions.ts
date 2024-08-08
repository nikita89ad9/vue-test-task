import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useModerationOptions() {
  const { t } = useI18n();

  const sortValue = ref<{ name: string; value: string }>({
    value: 'newest',
    name: t(`moderation.comments.panel.sortOptions.newest`),
  });

  const sortOptions = computed<{ name: string; value: string }[]>(() => {
    return [
      {
        name: t('moderation.comments.panel.sortOptions.newest'),
        value: 'newest',
      },
      {
        name: t('moderation.comments.panel.sortOptions.oldest'),
        value: 'oldest',
      },
    ];
  });

  const dateValue = ref<{ name: string; value: string }>({
    value: 'all',
    name: t(`moderation.comments.panel.dateOptions.all`),
  });

  const dateOptions = computed<{ name: string; value: string }[]>(() => {
    return [
      {
        name: t('moderation.comments.panel.dateOptions.all'),
        value: 'all',
      },
      {
        name: t('moderation.comments.panel.dateOptions.week'),
        value: 'week',
      },
      {
        name: t('moderation.comments.panel.dateOptions.month'),
        value: 'month',
      },
      {
        name: t('moderation.comments.panel.dateOptions.year'),
        value: 'year',
      },
    ];
  });

  //Ranges for filtering comments by date(not implemented on backend yet).

  // const weekRange = computed(() => {
  //   const currentDate = new Date();
  //   var diff = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
  //   const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), diff);

  //   return { start: startDate, end: currentDate };
  // });

  // const monthRange = computed(() => {
  //   const currentDate = new Date();
  //   const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  //   return { start: startDate, end: currentDate };
  // });

  // const yearRange = computed(() => {
  //   const currentDate = new Date();
  //   const startDate = new Date(currentDate.getFullYear(), 0, 1);

  //   return { start: startDate, end: currentDate };
  // });

  return {
    sortValue,
    sortOptions,
    dateValue,
    dateOptions,
  };
}
