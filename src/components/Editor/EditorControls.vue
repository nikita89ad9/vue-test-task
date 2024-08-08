<template>
  <BaseLayout class="layout_spaced">
    <div class="editor-controls">
      <div class="editor-controls__buttons">
        <BaseButton
          :disabled="step === 1"
          @click="$emit('setTab', step - 1)"
        >
          {{ $t('editor.controls.back') }}
        </BaseButton>
        <BaseButton
          :disabled="step === timelineItems.length"
          @click="$emit('setTab', step + 1)"
        >
          {{ $t('editor.controls.next') }}
        </BaseButton>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { useEditorTimeline } from '@composables/useEditorTimeline';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseLayout from '../common/BaseLayout/BaseLayout.vue';

  defineProps<{ step: number }>();

  const { timelineItems } = useEditorTimeline();

  defineEmits<{
    (e: 'publish'): void;
    (e: 'save'): void;
    (e: 'setTab', value: number): void;
  }>();
</script>

<style scoped lang="scss">
  .editor-controls {
    display: flex;
    justify-content: flex-end;
  }

  .editor-controls__buttons {
    margin-left: var(--space-5xl);
    flex-grow: 0;
    display: flex;
    gap: var(--space-s);

    button {
      flex-grow: 0;
      align-self: center;
    }
  }
</style>
