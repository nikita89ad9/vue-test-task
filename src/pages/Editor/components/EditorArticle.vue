<template>
  <div>
    <EditorMainPanel
      ref="mainPanel"
      class="layout_spaced"
      :editor="editor"
      :editorPanelItems="mainPanelItems"
      :emojis="emojis"
      :headingItems="headingItems"
      :alignItems="alignItems"
    />
    <BaseLayout class="layout_spaced">
      <div class="editor">
        <div class="editor-wrapper editor-wrapper_primary">
          <ContextMenu ref="tablePopup">
            <template #options="{ closePopup }">
              <HeaderMenuItem
                v-for="item in tableItems"
                :key="item.title"
                @click="executeContextAction(item.action, closePopup)"
              >
                <template #text>
                  {{ $t(`editor.options.table.${item.name}`) }}
                </template>
              </HeaderMenuItem>
            </template>
          </ContextMenu>
          <EditorTextarea
            :editor="editor"
            @checkIfTable="checkIfTable"
          />
        </div>
      </div>
      <div
        v-if="editor"
        class="character-count"
      >
        {{ $t('editor.wordsCount') }}:
        {{ editor.storage.characterCount.words() }}
      </div>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import { useElementSize } from '@vueuse/core';
  import { computed, ref } from 'vue';

  import ContextMenu from '@components/ContextMenu/ContextMenu.vue';
  import EditorMainPanel from '@/components/Editor/EditorMainPanel.vue';
  import EditorTextarea from '@/components/Editor/EditorTextarea.vue';
  import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';

  defineProps<{
    editor: Editor | undefined;
    tableItems: EditorPanelItem[];
    mainPanelItems: EditorPanelItem[];
    emojis: EmojiItem[];
    headingItems: EditorPanelItem[];
    alignItems: EditorPanelItem[];
  }>();

  const mainPanel = ref(null);
  const { height } = useElementSize(mainPanel);
  const panelHeight = computed(() => height.value + 'px');

  const tablePopup = ref<InstanceType<typeof ContextMenu> | null>(null);

  const checkIfTable = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetEl = target.parentNode?.nodeName;
    if (targetEl === 'TH' || targetEl === 'TD') {
      tablePopup.value?.openPopup();
    }
  };

  const executeContextAction = (
    action: (() => boolean | void) | undefined,
    callback: () => void
  ) => {
    if (action) {
      action();
    }
    callback();
  };
</script>

<style scoped lang="scss">
  .layout_spaced {
    margin-bottom: var(--space-xl);
  }

  .editor {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    background: var(--color-background-primary);

    .editor-wrapper {
      overflow-y: hidden;

      &_primary {
        height: calc(100vh - 262px - var(--header-height) - v-bind(panelHeight));
      }
    }
  }

  .character-count {
    margin-top: var(--space-xl);
    font-size: var(--font-size-s);
    text-align: center;
    color: var(--color-font-primary);
  }
</style>
