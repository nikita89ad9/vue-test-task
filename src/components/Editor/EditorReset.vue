<template>
  <BaseModal>
    <template #trigger>
      <button
        class="trigger"
        :title="$t(`editor.options.reset`)"
      >
        <IconWrapper :icon="icons.editorIcons.reset" />
      </button>
    </template>
    <template #modal="{ close }">
      <div class="reset">
        <h2 class="reset__title">{{ $t(`editor.options.resetPrompt`) }}</h2>
        <div class="reset__btns reset-btns">
          <BaseButton
            class="reset-btns__confirm"
            @click="resetStyling(close)"
          >
            {{ $t(`editor.options.resetConfirm`) }}
          </BaseButton>
          <BaseButton
            class="reset-btns__abort"
            @click="close"
          >
            {{ $t(`editor.options.resetAbort`) }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseModal from '../common/BaseModal.vue';

  const props = defineProps<{
    editor: Editor | undefined;
  }>();

  const resetStyling = (callback: () => void) => {
    props.editor?.chain().clearNodes().run();
    props.editor?.chain().unsetAllMarks().run();
    callback();
  };
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

  .reset {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 320px;
    position: relative;

    &__title {
      font-size: var(--font-size-l);
      margin-bottom: var(--space-xl);
    }

    &__btns {
      display: flex;
      gap: var(--space-s);

      .reset-btns__confirm {
        background-color: #50c878;
      }
    }
  }
</style>
