<template>
  <div class="editor-options">
    <EditorPanel
      v-if="isOpen"
      :editor="editor"
      :editorPanelItems="editorPanelItems"
      :emojis="emojis"
    />
    <div class="editor-options__controls">
      <button
        :title="$t('messages.openSettings')"
        class="editor-options__button"
        @click="togglePanel"
      >
        <IconWrapper :icon="icons.editorIcons.fontRegular" />
      </button>
      <EditorEmojisList
        :emojis="emojis"
        :editor="editor"
        display="dropdown_top dropdown_right"
      />
      <button
        v-if="!updating"
        :title="$t('messages.send')"
        class="editor-options__button editor-options__button_submit"
        @click="emits('submitItem')"
      >
        <IconWrapper
          :icon="icons.send"
          class="link-icon"
        />
      </button>
      <div
        v-else
        class="editor-options__updating"
      >
        <BaseButton
          small
          @click="emits('cancelUpdate')"
          >Cancel</BaseButton
        >
        <BaseButton
          small
          success
          @click="emits('updateComment')"
          >Update</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import { ref } from 'vue';

  import { icons } from '@/utils/icons';
  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';
  import EditorEmojisList from './EditorEmojisList.vue';
  import EditorPanel from './EditorPanel.vue';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import IconWrapper from '../IconWrapper.vue';

  defineProps<{
    editor: Editor | undefined;
    editorPanelItems: EditorPanelItem[];
    emojis: EmojiItem[];
    updating?: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'submitItem'): void;
    (e: 'cancelUpdate'): void;
    (e: 'updateComment'): void;
  }>();

  const isOpen = ref(false);

  const togglePanel = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<style scoped lang="scss">
  .editor-options {
    width: 100%;
    margin-top: var(--space-s);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__controls {
      display: flex;
      align-items: center;
      margin-left: auto;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--space-5xl);
      height: var(--space-5xl);
      background: transparent;
      border-radius: var(--space-border-xs);
      outline: none;
      transition: 0.2s all;

      &_submit {
        cursor: pointer;
      }

      :deep(path) {
        fill: var(--color-font-primary);
      }

      &:hover,
      &_active {
        background: var(--color-third);
        filter: brightness(1.4);
      }

      .link-icon {
        :deep(path) {
          fill: var(--color-extra-link-primary);
        }
      }
    }

    &__updating {
      display: flex;
      gap: var(--space-xs);
    }
  }
</style>
