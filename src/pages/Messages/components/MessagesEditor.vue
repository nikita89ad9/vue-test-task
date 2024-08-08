<template>
  <BaseLayout class="layout_spaced">
    <div class="editor">
      <div class="editor-wrapper editor-wrapper_secondary">
        <EditorTextarea
          :editor="editor"
          @pressEnter="send"
        />
      </div>
      <EditorSecondaryPanel
        :editor="editor"
        :editorPanelItems="secondaryPanelItems"
        :emojis="emojis"
        @submitItem="send"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, watch } from 'vue';

  import EditorSecondaryPanel from '@/components/Editor/EditorSecondaryPanel.vue';
  import EditorTextarea from '@/components/Editor/EditorTextarea.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import { useMessagesStore } from '@/stores/messagesStore/store';
  import { useEditorOptions } from '@/composables/useEditorOptions';
  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';

  const props = defineProps<{
    dialogId: string | undefined;
  }>();

  const emits = defineEmits<{
    sendMessage: [];
  }>();

  const { sendMessage } = useMessagesStore();
  const { isMessageSendPending } = storeToRefs(useMessagesStore());

  const placeholder = 'messages.placeholder';

  const { editor, editorOptions, secondaryPanelOptions } = useEditorOptions(placeholder);

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

  const send = () => {
    if (!editor.value || isMessageSendPending.value) return;
    if (editor.value?.getText().trim() !== '') {
      sendMessage(editor.value.getText());
      emits('sendMessage');
    }
    editor.value?.commands.clearContent();
  };

  watch(
    () => props.dialogId,
    () => {
      editor.value?.commands.focus();
    }
  );
</script>

<style scoped lang="scss">
  .editor {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    background: var(--color-background-primary);

    .editor-wrapper {
      &_secondary {
        overflow-y: auto;
        max-height: 100px;
        min-height: 20px;
      }
    }
  }
</style>
