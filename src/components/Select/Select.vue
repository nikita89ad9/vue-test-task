<template>
  <BaseDropdown
    v-model="isDropdownOpen"
    class="dropdown_bottom"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <template #content>
      <div class="select">
        <ul class="select__list select-list">
          <li
            v-for="option in options"
            :key="option.value"
            class="select-list__item"
            @click="updateModelValue(option)"
          >
            {{ option.name }}
            <IconWrapper
              v-if="option.value === modelValue.value"
              :icon="icons.checkmark"
              class="custom-icon"
            />
          </li>
        </ul>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import BaseDropdown from '@components/common/BaseDropdown/BaseDropdown.vue';
  import IconWrapper from '@components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import type { SelectOption } from '@/types/Select';

  defineProps<{
    modelValue: SelectOption;
    options: SelectOption[];
  }>();

  const emit = defineEmits<(e: 'update:modelValue', value: SelectOption) => void>();

  const isDropdownOpen = ref<boolean>(false);

  const updateModelValue = (item: SelectOption) => {
    emit('update:modelValue', item);
  };
</script>

<style scoped lang="scss">
  .custom-icon {
    height: var(--space-m);
    width: var(--space-m);
    margin-left: var(--space-xs);

    :deep(path) {
      fill: var(--color-primary);
    }
  }

  .select {
    width: 100%;
    background: var(--color-background-primary);
  }

  .select__list {
    width: 100%;
    top: 82px;
    max-height: 160px;
    overflow-y: auto;

    > .select-list__item {
      color: var(--color-font-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 40px;
      padding: var(--space-xs) var(--space-s);
      font-size: var(--font-size-s);
      cursor: pointer;

      &:hover {
        background-color: var(--color-extra-light);
      }
    }
  }
</style>
