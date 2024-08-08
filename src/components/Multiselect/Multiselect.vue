<template>
  <BaseDropdown
    v-model="isDropdownOpen"
    :closeOnClick="false"
  >
    <template #trigger>
      <BaseInput
        :placeholder="placeholder"
        variant="contained"
        readonly
        class="trigger"
        :clearable="false"
      >
        <template #append-icon>
          <RotatedIconWrapper
            class="trigger__icon"
            :isOpen="isDropdownOpen"
          >
            <component :is="icons.chevronDown" />
          </RotatedIconWrapper>
        </template>
      </BaseInput>
    </template>
    <template #content>
      <div class="multiselect">
        <MultiselectSearch
          :searchValue="searchValue"
          @updateSearchValue="updateSearchValue"
        />
        <MultiselectOptions
          :options="options"
          :selectedOptions="selectedIdsItems"
          @selectValue="selectValue"
        />
        <MultiselectControls
          :totalLength="options.length"
          :selectedLength="sizeSelectedValues"
          @handleSelection="handleSelection"
        />
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';

  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import RotatedIconWrapper from '@/components/RotatedIconWrapper.vue';
  import { icons } from '@/utils/icons';
  import MultiselectControls from './MultiselectControls.vue';
  import MultiselectOptions from './MultiselectOptions.vue';
  import MultiselectSearch from './MultiselectSearch.vue';
  import type { IMultiselectOptionProps } from './types';
  import BaseInput from '../common/BaseInput/BaseInput.vue';

  const props = withDefaults(
    defineProps<{
      placeholder: string;
      modelValue: IMultiselectOptionProps[];
      options: IMultiselectOptionProps[];
    }>(),
    {
      placeholder: 'Select value',
    }
  );

  const options = computed(() =>
    props.options.filter(item => item.name.includes(searchValue.value))
  );

  const emit = defineEmits<(e: 'update:modelValue', value: IMultiselectOptionProps[]) => void>();

  const isDropdownOpen = ref<boolean>(false);

  const searchValue = ref('');

  const updateSearchValue = (value: string) => {
    searchValue.value = value;
  };

  const items = computed(
    () => new Map<string, IMultiselectOptionProps>(options.value.map(item => [item.id, item]))
  );

  const selectedIdsItems = reactive<Set<string>>(new Set());

  watch(props.modelValue, () => {
    props.modelValue.forEach(item => {
      const t = items.value.get(item.id);

      if (t) {
        selectedIdsItems.add(t.id);
      }
    });
  });

  const sizeSelectedValues = computed(() => selectedIdsItems.size);

  const handleSelection = (value: boolean) => {
    const newIds = new Set<string>(value ? items.value.keys() : []);

    updateModelValue(getItemsByIds(newIds));
  };

  const selectValue = (id: IMultiselectOptionProps['id']): void => {
    if (selectedIdsItems.has(id)) {
      selectedIdsItems.delete(id);
    } else {
      selectedIdsItems.add(id);
    }

    updateModelValue(getItemsByIds(selectedIdsItems));
  };

  const getItemsByIds = (ids: Set<string>): Array<IMultiselectOptionProps> => {
    const result: Array<IMultiselectOptionProps> = [];

    ids.forEach(id => {
      const item = items.value.get(id);

      if (item) {
        result.push(item);
      }
    });

    return result;
  };

  const updateModelValue = (items: Array<IMultiselectOptionProps>) => {
    emit('update:modelValue', items);
  };
</script>

<style scoped lang="scss">
  .trigger {
    cursor: pointer;
  }

  .multiselect {
    min-width: 300px;
    height: 100%;
    background: var(--color-background-primary);
  }
</style>
