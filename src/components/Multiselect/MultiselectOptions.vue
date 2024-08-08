<template>
  <ul
    v-if="options.length"
    class="multiselect__list multiselect-list"
  >
    <li
      v-for="option in options"
      :key="option.id"
      class="multiselect-list__item"
    >
      <BaseCheckbox
        :modelValue="selectedOptions.has(option.id)"
        :name="option.name"
        class="left spaced"
        @change="selectValue(option.id)"
      >
        {{ option.name }}
      </BaseCheckbox>
    </li>
  </ul>
  <div
    v-else
    class="multiselect__placeholder"
  >
    {{ $t('multiselect.noItems') }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import type { IMultiselectOptionProps } from './types';
  import BaseCheckbox from '../common/BaseCheckbox/BaseCheckbox.vue';

  const props = defineProps<{
    options: IMultiselectOptionProps[];
    selectedOptions: Set<string>;
  }>();

  const emit = defineEmits<(e: 'selectValue', id: IMultiselectOptionProps['id']) => void>();

  const options = computed<IMultiselectOptionProps[]>(() => props.options);

  const selectValue = (id: IMultiselectOptionProps['id']) => {
    emit('selectValue', id);
  };
</script>

<style scoped lang="scss">
  .multiselect__list {
    max-height: 264px;
    overflow-y: auto;
    position: relative;

    > li {
      padding: var(--space-xs) var(--space-m);
    }
  }

  .multiselect__placeholder {
    padding: var(--space-2xl) var(--space-m);
    font-size: var(--font-size-s);
    color: var(--color-font-secondary);
    line-height: 1.5;
    text-align: center;
  }
</style>
