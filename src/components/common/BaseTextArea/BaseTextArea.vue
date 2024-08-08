<template>
  <textarea
    class="textarea"
    :placeholder="placeholder"
    :value="modelValue"
    :readonly="readonly"
    @input="handleInput"
  ></textarea>
</template>

<script setup lang="ts">
  import type { ITextAreaProps } from './types';

  withDefaults(defineProps<ITextAreaProps>(), {
    readonly: false,
    placeholder: '',
  });
  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value);
  };
</script>

<style scoped lang="scss">
  .textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: var(--border-light);
    border-radius: var(--space-border-s);
    padding: var(--space-l);
    font-size: var(--font-size-m);
    background: var(--color-background-primary);
    color: var(--color-font-primary);
    font-family: var(--font-manrope-regular);
  }
</style>
