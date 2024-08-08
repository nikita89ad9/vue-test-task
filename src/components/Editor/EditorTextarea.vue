<template>
  <EditorContent
    :editor="editor"
    class="editor-content"
    @click.right="emit('checkIfTable', $event)"
    @contextmenu.prevent
    @keydown.enter="emit('pressEnter')"
  />
</template>

<script setup lang="ts">
  import type { Editor } from '@tiptap/vue-3';
  import { EditorContent } from '@tiptap/vue-3';

  defineProps<{
    editor: Editor | undefined;
  }>();

  const emit = defineEmits<{
    checkIfTable: [value: MouseEvent];
    pressEnter: [];
  }>();
</script>

<style lang="scss">
  .editor-content {
    padding: 0;
    font-size: var(--font-size-s);
    height: auto;
    max-height: 100%;
    width: 100%;
    background: var(--color-background-primary);
    position: relative;
    overflow-y: auto;

    div[data-youtube-video] {
      display: flex;
      justify-content: center;

      iframe {
        margin: 0 auto;
      }
    }

    .mention {
      border: 1px solid var(--color-extra-link-primary);
      border-radius: var(--space-border-s);
      padding: 0 var(--space-2xs);
      color: var(--color-extra-link-primary);
      box-decoration-break: clone;
    }

    blockquote {
      padding-left: var(--space-xl);
      border-left: 3px solid var(--color-third);
    }

    ul li {
      list-style: disc;
    }

    ul,
    ol {
      padding: 0 var(--space-xl);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.5;
    }

    p {
      line-height: 1.5;
      color: var(--color-font-primary);
    }

    a {
      cursor: pointer;
      color: var(--color-extra-link-primary);
      text-decoration: underline;
    }
  }

  .tiptap {
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: var(--space-xl);
        border: 1px solid var(--color-third);
        padding: var(--space-2xs);
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: var(--color-background-third);
      }

      .selectedCell::after {
        z-index: 2;
        position: absolute;
        content: '';
        inset: 0;
        background-color: var(--color-background-secondary);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: var(--space-2xs);
        background-color: var(--color-font-secondary);
        pointer-events: none;
      }

      .tableWrapper {
        padding: var(--space-xl) 0;
        overflow-x: auto;
      }

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }

      hr {
        border-top: 1px solid var(--color-third);
      }

      p {
        margin: 0;
      }
    }

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #adb5bd;
      pointer-events: none;
      height: 0;
    }
  }
</style>
