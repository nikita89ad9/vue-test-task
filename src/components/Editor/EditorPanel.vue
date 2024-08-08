<template>
  <div
    v-if="editor"
    class="editor-panel"
  >
    <EditorPanelElement
      v-for="item in editorPanelItems"
      :key="item.name"
      :title="$t(`editor.options.${item.name}`)"
      :disabled="item.disabled"
      :active="item.active"
      @updateEditor="item.action"
    >
      <IconWrapper
        :icon="item.icon"
        class="editor-icon"
      />
    </EditorPanelElement>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import type { EditorPanelItem } from '@/types/Editor';
  import EditorPanelElement from './EditorPanelElement.vue';
  import IconWrapper from '../IconWrapper.vue';

  defineProps<{
    editor: Editor | undefined;
    editorPanelItems: EditorPanelItem[];
  }>();
</script>

<style lang="scss">
  .editor-panel {
    display: flex;
    gap: 1px;
    width: 100%;
    flex-wrap: wrap;
    background: var(--color-background-primary);
  }

  .editor-icon {
    height: var(--space-2xl);
    width: var(--space-2xl);
  }
</style>
