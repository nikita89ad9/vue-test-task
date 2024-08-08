<template>
  <BubbleMenu
    :editor="editor"
    :tippyOptions="{ duration: 100, zIndex: 1, placement: 'bottom' }"
  >
    <EditorPanelElement
      v-for="(item, index) in items"
      :key="index"
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
  </BubbleMenu>
</template>

<script setup lang="ts">
  import { BubbleMenu } from '@tiptap/vue-3';
  import { Editor } from '@tiptap/vue-3';

  import type { EditorPanelItem } from '@/types/Editor';
  import EditorPanelElement from './EditorPanelElement.vue';
  import IconWrapper from '../IconWrapper.vue';

  defineProps<{
    editor: Editor;
    items: EditorPanelItem[];
  }>();
</script>

<style lang="scss">
  .tippy-content {
    background: var(--color-background-primary);
    border: none;
    border-radius: var(--space-border-s);
    box-shadow: var(--shadow-widget);
    z-index: 999;

    div {
      display: flex;
      flex-wrap: wrap;
      max-width: 264px;
    }
  }

  body > div > .tippy-box > .tippy-content {
    border-radius: var(--space-border-s);
  }
</style>
