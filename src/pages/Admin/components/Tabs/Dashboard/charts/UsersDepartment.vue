<template>
  <Pie :data="data"></Pie>
</template>

<script setup lang="ts">
  import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

  import { computed } from 'vue';
  import { Pie } from 'vue-chartjs';

  import { articlesTopicData } from '../../stats';

  const props = defineProps<{ year: string }>();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = computed(() => {
    return {
      ...articlesTopicData,
      datasets: articlesTopicData.datasets.filter(el => el.label === props.year),
    };
  });
</script>
