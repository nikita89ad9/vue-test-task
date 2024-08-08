<template>
  <Line
    :data="articlesAmountData"
    :options="options as ChartOptions<'line'>"
  ></Line>
</template>

<script setup lang="ts">
  import {
    CategoryScale,
    Chart as ChartJS,
    type ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  } from 'chart.js';

  import { Line } from 'vue-chartjs';

  import { articlesAmountData, options } from '../../stats';

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
</script>
