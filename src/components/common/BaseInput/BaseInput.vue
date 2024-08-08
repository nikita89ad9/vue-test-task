<template>
  <div class="input">
    <label
      v-if="isLabelVisible"
      :class="['input__label', { 'input__label--error': error }]"
    >
      {{ label }}
    </label>
    <div
      class="input__wrapper"
      :class="[variantClass, { 'input__wrapper--error': error }]"
    >
      <slot
        name="prepend-icon"
        :clear="clear"
      ></slot>
      <input
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :value="modelValue"
        :name="name"
        :min="min"
        @input="handleInput"
      />
      <span
        :clear="clear"
        :class="[
          'input__append',
          { 'input-clearable': clearable },
          { 'input-clearable_active': modelValue },
        ]"
      >
        <slot
          name="append-icon"
          :clear="clear"
        ></slot>
      </span>
    </div>
    <label
      v-if="error"
      :class="['input__label', { 'input__label--error': error }]"
    >
      {{ errorMessage }}
    </label>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { isString } from '@/types/predicates/index';
  import type { BaseInputProps } from './types';

  const { t } = useI18n();

  const props = withDefaults(defineProps<BaseInputProps>(), {
    name: '',
    type: 'text',
    placeholder: '',
    label: '',
    variant: 'outlined',
    error: '',
    disabled: false,
    readonly: false,
    modelValue: '',
    min: 0,
    clearable: true,
  });

  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();

  const variantClass = computed(() => `input__wrapper--${props.variant}`);

  const errorMessage = computed(() => {
    if (!props.error) {
      return null;
    }

    return isString(props.error) ? props.error : t('general.error');
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emits('update:modelValue', target.value);
  };

  const clear = () => {
    emits('update:modelValue', '');
  };

  const isLabelVisible = computed(() => (props.modelValue !== '' ? true : false));
</script>

<style scoped lang="scss">
  .input {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--space-2xs);
    min-width: 150px;

    &__append {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: var(--space-m);
      height: var(--space-m);

      :deep(svg) {
        width: var(--space-m);
        height: var(--space-m);
      }
    }

    .input-clearable {
      width: var(--space-m);
      height: var(--space-m);
      visibility: hidden;
      cursor: pointer;

      :deep(path) {
        fill: var(--color-font-secondary);
      }

      &_active {
        visibility: visible;
      }
    }

    &__label {
      position: absolute;
      top: calc(-1 * var(--space-l));
      margin-left: var(--space-xs);
      font-size: var(--font-size-xs);
      font-family: var(--font-manrope-regular);
      color: var(--color-font-secondary);

      &--error {
        color: var(--color-extra-error);
      }
    }

    .input__wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: var(--space-border-s);
      padding: var(--space-xs);
      font-size: var(--font-size-m);
      font-family: var(--font-manrope-regular);
      border: var(--border-light);
      width: 100%;

      &:deep(path:nth-child(2)) {
        fill: var(--color-font-primary);
      }

      .input__field {
        font-size: var(--font-size-m);
        font-family: var(--font-manrope-regular);
        padding-left: var(--space-xs);
        padding-right: var(--space-xs);
        width: 100%;
        background: transparent;
        color: var(--color-font-primary);
      }

      &:hover {
        border: var(--border-dark);
      }

      &:focus-within {
        border: var(--border-dark);
      }

      &--error {
        border: var(--border-error);
      }

      &--contained {
        background-color: var(--color-background-third);

        .input__field {
          background-color: var(--color-background-third);
        }
      }

      .input__field:read-only {
        cursor: pointer;
      }
    }
  }
</style>
