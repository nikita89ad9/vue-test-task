<template>
  <BaseDropdown
    :class="display"
    closeOnClick
  >
    <template #trigger>
      <button
        class="emoji-trigger"
        :title="$t(`editor.options.emoji`)"
      >
        <IconWrapper
          :icon="icons.emojiSmile"
          class="emoji-trigger__icon"
        />
      </button>
    </template>
    <template #content>
      <div
        ref="emojis"
        class="emoji-container"
      >
        <div
          v-for="icon in emojisItems"
          :key="icon.name"
          class="emoji-container__item"
          @click="editor?.chain().setEmoji(icon.name).run()"
        >
          <img
            v-if="icon.fallbackImage"
            :src="icon.fallbackImage"
            :title="icon.name"
          />
          <template v-else>
            {{ icon.emoji }}
          </template>
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import { computed } from 'vue';

  import BaseDropdown from '@common/BaseDropdown/BaseDropdown.vue';
  import { icons } from '@/utils/icons';
  import type { EmojiItem } from '@/types/Editor';
  import IconWrapper from '../IconWrapper.vue';

  const props = defineProps<{
    editor: Editor | undefined;
    emojis: EmojiItem[];
    display: string;
  }>();

  const emojisItems = computed(() => props.emojis.slice(0, 140));
</script>

<style scoped lang="scss">
  .emoji-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

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

  .emoji-trigger__icon {
    width: var(--space-xl);
    height: var(--space-xl);
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }

  .emoji-container {
    position: relative;
    z-index: 1;
    width: 330px;
    height: 236px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    border-radius: var(--space-border-s);
    padding: var(--space-s);
    gap: var(--space-xs);
    overflow-y: scroll;
    cursor: auto;

    .emoji-container__item {
      width: var(--space-4xl);
      height: var(--space-4xl);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background: transparent;
      border-radius: 50%;
      transition: var(--transition-even);
      cursor: pointer;

      &:hover {
        background: var(--color-third);
        filter: brightness(1.4);
      }

      img {
        width: var(--space-2xl);
        height: var(--space-2xl);
        height: auto;
        object-fit: cover;
      }
    }
  }
</style>
