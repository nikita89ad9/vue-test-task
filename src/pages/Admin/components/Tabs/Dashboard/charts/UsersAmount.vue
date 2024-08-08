<template>
  <Bar
    :data="usersAmountData"
    :options="options"
  />
</template>

<script setup lang="ts">
  import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
  } from 'chart.js';

  import { Bar } from 'vue-chartjs';

  import { options, usersAmountData } from '../../stats';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
</script>
