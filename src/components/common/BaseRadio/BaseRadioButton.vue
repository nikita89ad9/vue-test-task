<template>
  <div
    class="radio"
    :class="{ 'radio--active': props?.checked }"
  >
    <input
      :id="id"
      ref="radio"
      class="radio-button"
      type="radio"
      :name="name"
      :checked="checked"
      @change="selectRadio?.setActive(value)"
    />
    <label
      class="radio__label"
      :for="id"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';

  import type { IProvideSetActiveMethod, IRadioButtonProp } from './types';

  const props = defineProps<IRadioButtonProp>();

  const selectRadio: IProvideSetActiveMethod | undefined = inject('selectRadio');

  const name: string | undefined = inject('radioName');
</script>

<style scoped lang="scss">
  .radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);

    input[type='radio'] {
      appearance: none;
      font: inherit;
      color: currentcolor;
      width: 25px;
      height: 25px;
      border: 2px solid var(--color-font-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input[type='radio']::before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--color-primary);
      background-color: var(--color-primary);
    }

    input[type='radio']:checked::before {
      transform: scale(1);
    }

    &__label {
      font-size: var(--font-size-s);
      font-family: var(--font-manrope-regular);
      color: var(--color-font-primary);
    }

    &--active {
      .radio {
        input[type='radio'] {
          appearance: none;
          margin: 0;
          font: inherit;
          color: currentcolor;
          width: 1.05em;
          height: 1.05em;
          border: 2px solid var(--color-primary);
          border-radius: 50%;
          transform: translateY(-0.075em);
        }

        &__toggle {
          border: var(--border-toggle-active);

          &-inner {
            width: 100%;
            height: 100%;
            background-color: var(--color-primary);
            border-radius: 50%;
            border: var(--border-toggle-active);
          }
        }

        &__label {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
