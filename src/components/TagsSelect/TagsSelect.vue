<template>
  <div>
    <div
      v-if="modelValue.length"
      class="selected-options"
    >
      <Tile
        v-for="item in modelValue"
        :key="item.id"
        deletable
        class="selected-options__item"
        :title="$t('editor.select.delete')"
        @click="selectValue(item.id)"
        >{{ item.name }}</Tile
      >
    </div>
    <BaseDropdown
      v-model="isDropdownOpen"
      :closeOnClick="false"
      class="select"
    >
      <template #trigger>
        <BaseInput
          :placeholder="placeholder"
          variant="contained"
          readonly
          class="select__trigger"
          :clearable="false"
        >
          <template #append-icon>
            <RotatedIconWrapper :isOpen="isDropdownOpen">
              <component :is="icons.chevronDown" />
            </RotatedIconWrapper>
          </template>
        </BaseInput>
      </template>
      <template #content>
        <div class="select__content">
          <TagsSelectSearch
            :options="options"
            @addTag="value => addTag({ name: value })"
            @filterTags="value => getTags({ search: value })"
          />
          <TagsSelectOptions
            :options="options"
            :selectedOptions="selectedIdsItems"
            @selectValue="selectValue"
          />
        </div>
      </template>
    </BaseDropdown>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import RotatedIconWrapper from '@/components/RotatedIconWrapper.vue';
  import Tile from '@/components/Tile/Tile.vue';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import { icons } from '@/utils/icons';
  import TagsSelectOptions from './TagsSelectOptions.vue';
  import TagsSelectSearch from './TagsSelectSearch.vue';
  import type { ITagsSelectProps } from './types';

  const { getTags, addTag } = useTagsStore();

  const props = withDefaults(
    defineProps<{
      placeholder: string;
      modelValue: ITagsSelectProps[];
      options: ITagsSelectProps[];
    }>(),
    {
      placeholder: 'Select value',
    }
  );

  const emit = defineEmits<(e: 'update:modelValue', value: ITagsSelectProps[]) => void>();

  const isDropdownOpen = ref<boolean>(false);

  const items = computed(
    () => new Map<string, ITagsSelectProps>(props.options.map(item => [item.id, item]))
  );

  const selectedIdsItems = computed<Set<string>>(() => {
    const result: Set<string> = new Set();

    props.modelValue.forEach(item => {
      const t = items.value.get(item.id);

      if (t) {
        result.add(t.id);
      }
    });

    return result;
  });

  const selectValue = (id: ITagsSelectProps['id']): void => {
    if (selectedIdsItems.value.has(id)) {
      selectedIdsItems.value.delete(id);
    } else {
      selectedIdsItems.value.add(id);
    }

    updateModelValue(getItemsByIds(selectedIdsItems.value));
  };

  const getItemsByIds = (ids: Set<string>): Array<ITagsSelectProps> => {
    const result: Array<ITagsSelectProps> = [];

    ids.forEach(id => {
      const item = items.value.get(id);

      if (item) {
        result.push(item);
      }
    });

    return result;
  };

  const updateModelValue = (items: Array<ITagsSelectProps>) => {
    emit('update:modelValue', items);
  };
</script>

<style scoped lang="scss">
  .select {
    width: 100%;

    &__trigger {
      width: 100%;
      display: flex;
      align-self: flex-start;
      background: transparent;
    }

    &__content {
      min-width: 300px;
      height: 100%;
      max-width: 100%;
      background: var(--color-background-primary);
    }
  }

  .selected-options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-s);
    padding: var(--space-xs) 0;

    &__item {
      background: var(--color-third);
      cursor: pointer;
    }
  }
</style>
