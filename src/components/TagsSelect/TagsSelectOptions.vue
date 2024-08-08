<template>
  <ul
    v-if="options.length"
    class="select__list select-list"
  >
    <li
      v-for="option in options"
      :key="option.id"
    >
      <Tile
        :class="[
          'select-list__item',
          { 'select-list__item_selected': selectedOptions.has(option.id) },
        ]"
        @click="selectValue(option.id)"
      >
        {{ option.name }}
      </Tile>
    </li>
  </ul>
  <div
    v-else
    class="select__placeholder"
  >
    {{ $t('editor.select.noItems') }}
  </div>
</template>

<script setup lang="ts">
  import Tile from '@/components/Tile/Tile.vue';
  import type { ITagsSelectProps } from './types';

  defineProps<{
    options: ITagsSelectProps[];
    selectedOptions: Set<string>;
  }>();

  const emit = defineEmits<(e: 'selectValue', id: ITagsSelectProps['id']) => void>();

  const selectValue = (id: ITagsSelectProps['id']) => {
    emit('selectValue', id);
  };
</script>

<style scoped lang="scss">
  .select-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 0;
    max-height: 148px;
    width: 500px;
    overflow-y: auto;
    gap: var(--space-s);
    padding: var(--space-m);

    @include w-max($md) {
      width: 400px;
    }

    @include w-max($sm) {
      width: 300px;
    }

    &__item {
      background-color: var(--color-third);
      cursor: pointer;

      &_selected {
        background-color: var(--color-primary);
      }
    }
  }

  .select__placeholder {
    padding: var(--space-3xl) var(--space-m);
    font-size: var(--font-size-s);
    line-height: 1.5;
    color: var(--color-font-secondary);
    text-align: center;
  }
</style>
