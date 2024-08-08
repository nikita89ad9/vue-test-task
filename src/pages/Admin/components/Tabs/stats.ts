import type { ChartData, ChartOptions, Point } from 'chart.js';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';

import { computed } from 'vue';

import { useThemeStore } from '@/stores/themeStore/store';

setActivePinia(createPinia());

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const topics = ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'];

export const options = computed<ChartOptions<'bar' | 'pie' | 'line'>>(() => {
  const { theme } = storeToRefs(useThemeStore());
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.value === 'dark' ? '#dcdcdc' : '#353535',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: theme.value === 'dark' ? '#dcdcdc' : '#353535' },
        grid: { color: theme.value === 'dark' ? '#dcdcdc' : '#353535' },
      },
      y: {
        ticks: { color: theme.value === 'dark' ? '#dcdcdc' : '#353535' },
        grid: { color: theme.value === 'dark' ? '#dcdcdc' : '#353535' },
      },
    },
  };
});

//Articles
export const articlesAmountData: ChartData<'line', (number | Point | null)[], unknown> = {
  labels: months,
  datasets: [
    {
      label: '2021',
      data: [0, 20, 20, 60, 60, 120, 140, 180, 120, 125, 105, 110, 170],
      backgroundColor: 'white',
      borderColor: '#c63031',
      cubicInterpolationMode: 'monotone',
    },
    {
      label: '2022',
      data: [0, 30, 25, 50, 80, 120, 125, 120, 165, 145, 90, 110, 170],
      backgroundColor: 'white',
      borderColor: '#d5645a',
      cubicInterpolationMode: 'monotone',
    },
    {
      label: '2023',
      data: [0, 20, 40, 25, 60, 120, 120, 190, 120, 105, 105, 100, 190],
      backgroundColor: 'white',
      borderColor: '#e4b9b2',
      cubicInterpolationMode: 'monotone',
    },
  ],
};

export const articlesTopicData: ChartData<'pie', number[], unknown> = {
  labels: topics,
  datasets: [
    {
      label: '2021',
      backgroundColor: ['#c63031', '#d5645a', '#df8f85', '#e4b9b2', '#e2e2e2'],
      data: [40, 20, 80, 10, 30],
    },
    {
      label: '2022',
      backgroundColor: ['#c63031', '#d5645a', '#df8f85', '#e4b9b2', '#e2e2e2'],
      data: [60, 10, 90, 30, 35],
    },
    {
      label: '2023',
      backgroundColor: ['#c63031', '#d5645a', '#df8f85', '#e4b9b2', '#e2e2e2'],
      data: [40, 20, 80, 10, 15],
    },
  ],
};

export const articlesGeneralData = {
  labels: months,
  datasets: [
    {
      label: 'Vue',
      backgroundColor: '#c63031',
      data: [40, 25, 15, 39, 10, 40, 39, 60, 40, 20, 12, 11],
    },
    {
      label: 'React',
      backgroundColor: '#d5645a',
      data: [40, 60, 22, 32, 20, 10, 29, 50, 34, 23, 18, 10],
    },
    {
      label: 'Angular',
      backgroundColor: '#df8f85',
      data: [20, 30, 40, 29, 20, 10, 29, 30, 25, 10, 32, 21],
    },
    {
      label: 'AI',
      backgroundColor: '#e4b9b2',
      data: [42, 22, 18, 33, 15, 20, 29, 50, 20, 12, 16, 19],
    },
    {
      label: 'Java',
      backgroundColor: '#e2e2e2',
      data: [14, 10, 9, 19, 20, 10, 39, 20, 33, 21, 31, 21],
    },
  ],
};

export const usersAmountData = {
  labels: months,
  datasets: [
    {
      label: '2021',
      backgroundColor: '#c63031',
      data: [40, 25, 15, 39, 10, 40, 39, 60, 40, 20, 12, 11],
    },
    {
      label: '2022',
      backgroundColor: '#d5645a',
      data: [40, 60, 22, 32, 20, 10, 29, 50, 34, 23, 18, 10],
    },
    {
      label: '2023',
      backgroundColor: '#df8f85',
      data: [20, 30, 40, 29, 20, 10, 29, 30, 25, 10, 32, 21],
    },
  ],
};
