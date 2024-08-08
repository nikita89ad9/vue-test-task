<template>
  <BaseLayout class="sticky">
    <EditorPanel
      :editor="editor"
      :editorPanelItems="editorPanelItems"
      :emojis="emojis"
    >
      <EditorAlign
        :editor="editor"
        :alignItems="alignItems"
        display="dropdown_bottom"
      />
      <EditorHeading
        :editor="editor"
        :headingItems="headingItems"
        display="dropdown_bottom"
      />
      <EditorLink :editor="editor" />
      <EditorTableMenu :editor="editor" />
      <EditorVideoUpload :editor="editor" />
      <EditorImageUpload :editor="editor" />
      <EditorEmojisList
        :editor="editor"
        :emojis="emojis"
        display="dropdown_bottom"
      />
      <EditorReset :editor="editor" />
    </EditorPanel>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';
  import EditorAlign from './EditorAlign.vue';
  import EditorEmojisList from './EditorEmojisList.vue';
  import EditorHeading from './EditorHeading.vue';
  import EditorImageUpload from './EditorImageUpload.vue';
  import EditorLink from './EditorLink.vue';
  import EditorPanel from './EditorPanel.vue';
  import EditorReset from './EditorReset.vue';
  import EditorTableMenu from './EditorTableMenu.vue';
  import EditorVideoUpload from './EditorVideoUpload.vue';
  import BaseLayout from '../common/BaseLayout/BaseLayout.vue';

  defineProps<{
    editor: Editor | undefined;
    editorPanelItems: EditorPanelItem[];
    emojis: EmojiItem[];
    headingItems: EditorPanelItem[];
    alignItems: EditorPanelItem[];
  }>();
</script>

<style scoped lang="scss">
  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
