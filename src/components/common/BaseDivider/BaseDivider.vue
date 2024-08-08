<template>
  <hr />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{ height?: string }>(), {
    height: '1',
  });

  const lineHeight = computed(() => props.height + 'px');
</script>

<style scoped lang="scss">
  hr {
    background: var(--color-third);
    height: v-bind(lineHeight);
    width: 100%;
  }
</style>
