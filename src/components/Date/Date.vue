<template>
  <span class="date">
    {{ date }}
  </span>
</template>

<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      utcDate?: number | string;
      dateFormat?: string;
    }>(),
    {
      utcDate: 1695731896593,
      dateFormat: 'MMM D, YYYY',
    }
  );

  const date = useDateFormat(props.utcDate, props.dateFormat, {
    locales: 'en-US',
  });
</script>

<style scoped lang="scss">
  .date {
    color: var(--color-font-secondary);
    font-size: var(--font-size-s);

    @include w-max($xl) {
      font-size: var(--font-size-xs);
    }
  }
</style>
