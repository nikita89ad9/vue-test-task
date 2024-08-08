<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { provide, ref, watchEffect } from 'vue';

  import type { TTheme } from '@/stores/themeStore/types';
  import type { IRadioGroupProp } from './types';

  const props = defineProps<IRadioGroupProp>();
  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();

  const selected = ref<string>(props.modelValue);

  provide('selectRadio', {
    setActive: function (value: TTheme) {
      selected.value = value;
    },
  });
  provide('radioName', props.name);

  watchEffect(() => {
    emits('update:modelValue', selected.value);
  });
</script>

<style lang="scss">
  .radio-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
</style>
