<template>
  <div class="scrollable">
    <table class="table">
      <thead class="table__header table-header">
        <tr class="table-header__row">
          <th class="table-header__cell"></th>
          <th
            v-for="item in headers"
            :key="item.key"
            class="table-header__cell"
            @click="emit('sortTableItems', item.key)"
          >
            <div class="table-header__wrapper">
              {{ item.text }}
              <IconWrapper
                v-if="sortValue === item.key"
                class="header-icon"
                :class="{ 'header-icon_rotated': sortOrder }"
                :icon="icons.chevronDown"
              >
              </IconWrapper>
            </div>
          </th>
          <th class="table-header__cell">
            {{ $t('table.tableHeader.actions') }}
          </th>
        </tr>
      </thead>
      <tbody class="table__body table-body">
        <tr
          v-for="item in data"
          :key="item.id"
          :class="[
            'table-body__row',
            { 'table-body__row_selected': selectedData.has(item.id) && markAsSelected },
            { 'table-body__row_resolved': selectedData.has(item.id) && markAsResolved },
          ]"
        >
          <td class="table-body__cell">
            <BaseCheckbox
              :modelValue="selectedData.has(item.id)"
              :name="String(item.id)"
              :title="
                selectedData.has(item.id)
                  ? $t('table.unmark')
                  : markAsSelected
                    ? $t('table.markAsSelected')
                    : $t('table.markAsResolved')
              "
              @change="selectValue(item.id)"
            />
          </td>
          <td
            v-for="option in headers"
            :key="String(option.key)"
            class="table-body__cell"
            @click="$emit('routePush', item.id)"
          >
            <span class="table-body__content">
              {{ dataFormat(option.key, item[option.key as keyof typeof item] as keyof T) }}
            </span>
          </td>
          <td class="table-body__cell">
            <BaseDropdown
              closeOnClickOutside
              class="table-body__dropdown dropdown_right dropdown_bottom"
            >
              <template #trigger>
                <IconWrapper
                  :icon="icons.moreVertical"
                  class="action-icon"
                >
                </IconWrapper>
              </template>
              <template #content>
                <BaseMenu class="table-menu">
                  <HeaderMenuItem
                    v-for="menuItem in menuItems"
                    :key="menuItem.text"
                    @click="menuItem.action(item)"
                  >
                    <template #icon>
                      <IconWrapper :icon="menuItem.icon"> </IconWrapper>
                    </template>
                    <template #text>
                      {{ menuItem.text }}
                    </template>
                  </HeaderMenuItem>
                </BaseMenu>
              </template>
            </BaseDropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends DataTableUnion">
  import { computed } from 'vue';

  import BaseDropdown from '@components/common/BaseDropdown/BaseDropdown.vue';
  import BaseMenu from '@components/common/BaseMenu/BaseMenu/BaseMenu.vue';
  import BaseCheckbox from '@/components/common/BaseCheckbox/BaseCheckbox.vue';
  import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { formatDate } from '@/utils/formatDate';
  import { icons } from '@/utils/icons';
  import type { DataTableUnion, HeaderMenu, TableValue } from './types';

  const props = defineProps<{
    modelValue: TableValue[];
    data: T[];
    headers: { key: string; text: string }[];
    sortOrder: boolean;
    sortValue: string;
    menuItems: HeaderMenu<T>[];
    markAsSelected?: boolean;
    markAsResolved?: boolean;
  }>();

  const emit = defineEmits<{
    sortTableItems: [value: string];
    'update:modelValue': [value: TableValue[]];
    deleteItem: [itemData: T];
    editItem: [itemData: T];
    routePush: [itemID: string];
  }>();

  const selectValue = (id: string) => {
    if (selectedData.value.has(id)) {
      selectedData.value.delete(id);
    } else {
      selectedData.value.add(id);
    }

    emit('update:modelValue', getItemsByIds(selectedData.value));
  };

  const items = computed(() => new Map<string, T>(props.data.map(item => [item.id, item])));

  const selectedData = computed<Set<string>>(() => {
    const result: Set<string> = new Set();

    props.modelValue.forEach(item => {
      const dataItem = items.value.get(item.id);

      if (dataItem) {
        result.add(dataItem.id);
      }
    });

    return result;
  });

  const dataFormat = (key: string, data: keyof T) => {
    if (key === 'createdAt' || key === 'updatedAt') {
      return formatDate(data as string);
    }

    if (Array.isArray(data)) return data.join(', ');
    return data;
  };

  const getItemsByIds = (ids: Set<string>): Array<T> => {
    const result: Array<T> = [];

    ids.forEach(id => {
      const item = items.value.get(id);

      if (item) {
        result.push(item);
      }
    });

    return result;
  };
</script>

<style scoped lang="scss">
  .header-icon {
    display: flex;
    height: var(--space-l);
    width: var(--space-l);
    transition: var(--transition-even);

    &__rotated {
      transform: rotate(180deg);
    }
  }

  .action-icon {
    height: var(--space-2xl);
    width: var(--space-2xl);
    margin: 0 auto;
    cursor: pointer;
  }

  .table-menu {
    position: relative;
  }

  .scrollable {
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
  }

  .table {
    font-size: var(--font-size-s);
    color: var(--color-font-primary);
    background: var(--color-background-primary);
    border: 1px solid var(--color-extra-light);
    border-collapse: collapse;
    width: 100%;
  }

  .table-header {
    &__row {
      height: 60px;

      @include w-max($lg) {
        height: 30px;
      }
    }

    &__cell {
      width: auto;
      padding: var(--space-s) var(--space-m);
      text-align: left;
      position: sticky;
      top: 0;
      z-index: 3;
      background: var(--color-background-primary);
      cursor: pointer;
      text-wrap: nowrap;
      font-size: var(--font-size-xs);

      @include w-max($lg) {
        padding: var(--space-xs) var(--space-s);
        font-size: var(--font-size-2xs);
      }

      &::after {
        content: '';
        z-index: 2;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--color-extra-light);
      }

      &::before {
        content: '';
        z-index: 2;
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--color-extra-light);
      }

      &:last-child {
        min-width: 50px;
        text-align: center;
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }
  }

  .table-body {
    &__row {
      height: 60px;
      position: relative;

      &_selected {
        background: #d3ffde;
      }

      &_resolved {
        background: var(--color-extra-light);
        color: var(--color-third);
      }

      @include w-max($lg) {
        height: 30px;
      }
    }

    &__cell {
      position: relative;
      width: auto;
      text-wrap: nowrap;
      cursor: pointer;
      max-width: 400px;
      font-size: var(--font-size-xs);

      &:not(:first-child),
      &:not(:last-child) {
        padding: var(--space-xs) var(--space-m);
      }

      &:first-child,
      &:last-child {
        width: 60px;
        min-width: 60px;
      }

      @include w-max($lg) {
        padding: var(--space-xs) var(--space-s);
        font-size: var(--font-size-2xs);
      }

      label {
        width: var(--space-2xl);
        height: var(--space-2xl);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--color-extra-light);
        z-index: 2;
      }

      &:last-child {
        min-width: 50px;
        text-align: center;
      }
    }

    &__content {
      width: max-content;
      max-width: 400px;
      display: flex;
      align-self: flex-start;
      flex-wrap: wrap;
      text-wrap: balance;
      line-height: 1.5;
    }

    &__dropdown {
      :deep(.dropdown__activator) {
        position: relative;
        left: 100%;
        transform: translate(-50%, 0);
      }
    }
  }
</style>
