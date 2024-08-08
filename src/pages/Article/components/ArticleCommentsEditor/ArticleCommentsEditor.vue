<template>
  <div class="editor">
    <div class="editor-wrapper editor-wrapper_secondary">
      <ContextMenu
        ref="tablePopup"
        :options="tableItems"
      />
      <EditorTextarea
        class="editor-comments"
        :editor="editor"
        @checkIfTable="checkIfTable"
        @pressEnter="submitItem"
      />
    </div>
    <EditorSecondaryPanel
      :editor="editor"
      :editorPanelItems="secondaryPanelItems"
      :emojis="emojis"
      :updating="updating"
      :itemId="itemId"
      @submitItem="submitItem"
      @cancelUpdate="emit('cancelUpdate')"
      @updateComment="updateComment"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';

  import ContextMenu from '@/components/ContextMenu/ContextMenu.vue';
  import EditorSecondaryPanel from '@/components/Editor/EditorSecondaryPanel.vue';
  import EditorTextarea from '@/components/Editor/EditorTextarea.vue';
  import { useEditorOptions } from '@/composables/useEditorOptions';
  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';

  const props = defineProps<{
    updating?: boolean;
    initialValue?: string;
    itemId?: string;
  }>();

  const emit = defineEmits<{
    (e: 'addComment', value: string): void;
    (e: 'updateComment', value: string): void;
    (e: 'cancelUpdate'): void;
  }>();

  const placeholder = `articles.comments.leave_a_comment`;

  const { editor, editorOptions, secondaryPanelOptions, tableSettingsOptions } = useEditorOptions(
    placeholder,
    props.initialValue
  );

  const tablePopup = ref<InstanceType<typeof ContextMenu> | null>(null);

  const checkIfTable = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetEl = target.parentNode?.nodeName;
    if (targetEl === 'TH' || targetEl === 'TD') {
      tablePopup.value?.openPopup();
    }
  };

  const tableItems = computed((): EditorPanelItem[] => {
    if (editor) {
      return tableSettingsOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const emojis = computed((): EmojiItem[] => {
    if (editor.value?.storage.emoji.emojis) {
      return editor.value?.storage.emoji.emojis;
    } else {
      return [];
    }
  });

  const secondaryPanelItems = computed((): EditorPanelItem[] => {
    if (editor) {
      return secondaryPanelOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const submitItem = () => {
    if (!editor.value) return;
    if (editor.value?.getText().trim() !== '') {
      emit('addComment', editor.value.getText());
    }
    editor.value?.commands.clearContent();
  };

  const updateComment = () => {
    if (!editor.value) return;
    if (editor.value?.getText().trim() !== '') {
      emit('updateComment', editor.value.getText());
      emit('cancelUpdate');
    }
  };

  onMounted(() => {
    editor.value?.commands.focus();
  });
</script>

<style scoped lang="scss">
  .editor {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    background: var(--color-background-primary);

    &-wrapper {
      &_secondary {
        overflow-y: auto;
        max-height: 100px;
        min-height: 20px;
        border-radius: var(--space-border-s);
        border: var(--border-light);
      }
    }

    &-comments {
      width: 100%;
      font-size: var(--font-size-s);
      padding: var(--space-s);
    }
  }
</style>
