<template>
  <label
    class="checkbox"
    @input="handleClick"
  >
    <div class="checkbox__item checkbox-item">
      <input
        type="checkbox"
        class="checkbox-item__input"
        :disabled="disabled"
        :checked="modelValue"
        :name="name"
        :value="modelValue"
      />
      <div class="checkbox-item__icon">
        <IconWrapper
          :icon="icons.checkmark"
          class="custom-wrapper"
        />
      </div>
    </div>
    <span class="checkbox__label"><slot></slot></span>
  </label>
</template>

<script setup lang="ts">
  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import type { TCheckboxProp } from './types';

  const props = withDefaults(defineProps<TCheckboxProp>(), {
    disabled: false,
    name: 'Checkbox name',
    modelValue: false,
  });

  const emit = defineEmits<(e: 'update:modelValue', value: boolean, name: string) => void>();

  const handleClick = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked !== null) emit('update:modelValue', target.checked, props.name);
  };
</script>

<style scoped lang="scss">
  .custom-wrapper {
    width: var(--space-l);
    height: var(--space-l);
    opacity: 0;

    :deep(path) {
      fill: var(--color-font-light);
    }

    @include w-max($sm) {
      height: var(--space-m);
      width: var(--space-m);
    }
  }

  .checkbox {
    display: flex;
    align-items: center;
    user-select: none;
    padding: 0;
    box-sizing: border-box;
    cursor: pointer;
    flex-grow: 0;

    &-item {
      overflow: hidden;
    }

    &-item__input[type='checkbox'] {
      position: absolute;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
    }

    &-item__input[type='checkbox'] + &-item__icon {
      background: var(--color-extra-light);
      height: var(--space-2xl);
      width: var(--space-2xl);
      box-sizing: border-box;
      border-radius: var(--space-2xs);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      @include w-max($sm) {
        height: var(--space-l);
        width: var(--space-l);
      }
    }

    &-item__input[type='checkbox']:checked + &-item__icon {
      background: var(--color-primary);

      .custom-wrapper {
        opacity: 1;
      }
    }

    &-item__input[type='checkbox']:disabled ~ &-item__icon {
      cursor: not-allowed;
    }

    &-item__input[type='checkbox']:enabled ~ &-item__icon {
      cursor: pointer;
    }

    &__label {
      font-size: var(--font-size-s);
      font-family: var(--font-manrope-regular);
    }
  }

  .checkbox:has(.checkbox-item__input[type='checkbox']:disabled) {
    cursor: not-allowed;

    .checkbox__label {
      color: var(--color-extra-light);
    }
  }

  .checkbox.left {
    flex-direction: row-reverse;

    .checkbox-item {
      margin-left: var(--space-m);
    }
  }

  .checkbox.right {
    flex-direction: row;

    .checkbox-item {
      margin-right: var(--space-m);
    }
  }

  .checkbox.spaced {
    justify-content: space-between;
  }
</style>
