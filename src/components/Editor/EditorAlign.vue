<template>
  <BaseDropdown closeOnClick>
    <template #trigger>
      <button
        :class="['trigger', { trigger_active: selectedIcon }]"
        :title="$t(`editor.options.align`)"
      >
        <IconWrapper :icon="selectedIcon ? selectedIcon.icon : icons.editorIcons.alignLeft" />
      </button>
    </template>
    <template #content>
      <ul class="align-list">
        <li
          v-for="icon in alignItems"
          :key="icon.name"
          :class="['align-list__item', { 'align-list__item_active': icon.active }]"
          :title="icon.title"
          @click="icon.action"
        >
          <IconWrapper :icon="icon.icon" />
        </li>
      </ul>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { icons } from '@utils/icons';
  import type { EditorPanelItem } from '@/types/Editor';
  import BaseDropdown from '../common/BaseDropdown/BaseDropdown.vue';
  import IconWrapper from '../IconWrapper.vue';

  const props = defineProps<{
    alignItems: EditorPanelItem[];
  }>();

  const selectedIcon = computed(() => {
    return props.alignItems.filter(item => item.active)[0];
  });
</script>

<style scoped lang="scss">
  .trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

    :deep(path) {
      fill: var(--color-font-primary);
    }

    &:hover,
    &_active {
      background: var(--color-third);
      filter: brightness(1.4);
    }

    &_disabled {
      opacity: 0.5;

      &:hover {
        background: transparent;
      }
    }
  }

  .align-list {
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--space-5xl);
      height: var(--space-5xl);
      background: transparent;

      :deep(path) {
        fill: var(--color-font-primary);
      }

      &:hover,
      &_active {
        background: var(--color-third);
        filter: brightness(1.4);
      }
    }
  }
</style>
