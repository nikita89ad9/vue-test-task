<template>
  <BaseDropdown
    :closeOnClick="false"
    class="dropdown_bottom dropdown_left"
  >
    <template #trigger>
      <button
        class="trigger"
        :title="$t(`editor.options.table.add`)"
      >
        <IconWrapper
          :icon="icons.editorIcons.table"
          class="trigger__icon"
        />
      </button>
    </template>
    <template #content="{ close }">
      <div class="table-options">
        <div class="table-options__controls">
          <BaseInput
            v-model="rows"
            :placeholder="$t(`editor.options.table.rows`)"
            :label="$t(`editor.options.table.rows`)"
            :min="1"
            class="table-options__input"
            type="number"
          />
          <BaseInput
            v-model="cols"
            :min="1"
            :placeholder="$t(`editor.options.table.cols`)"
            :label="$t(`editor.options.table.cols`)"
            class="table-options__input"
            type="number"
          />
          <BaseCheckbox
            :modelValue="withHeader"
            name="aspect-ratio"
            class="right"
            @update:modelValue="toggleHeader"
          >
            {{ $t(`editor.options.table.withHeader`) }}
          </BaseCheckbox>
        </div>
        <BaseButton
          class="table-submit"
          @click="createTable(close)"
        >
          {{ $t(`editor.options.table.createTable`) }}
        </BaseButton>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import type { Editor } from '@tiptap/vue-3';

  import { ref } from 'vue';

  import BaseDropdown from '@common/BaseDropdown/BaseDropdown.vue';
  import { icons } from '@/utils/icons';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseCheckbox from '../common/BaseCheckbox/BaseCheckbox.vue';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import IconWrapper from '../IconWrapper.vue';

  const props = defineProps<{
    editor: Editor | undefined;
  }>();

  const cols = ref<number>(1);
  const rows = ref<number>(1);
  const withHeader = ref<boolean>(true);

  const toggleHeader = () => {
    withHeader.value = !withHeader.value;
  };

  const resetValues = () => {
    cols.value = 1;
    rows.value = 1;
    withHeader.value = true;
  };

  const createTable = (callback: () => void) => {
    props.editor
      ?.chain()
      .insertTable({ rows: rows.value, cols: cols.value, withHeaderRow: withHeader.value })
      .run();
    resetValues();
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

    &__icon {
      width: var(--space-xl);
      height: var(--space-xl);
      margin-left: var(--space-xs);
      margin-right: var(--space-xs);
    }
  }

  .table-options {
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: var(--space-xl);
    background: var(--color-background-primary);

    &__controls {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
      margin-bottom: var(--space-xl);
    }
  }
</style>
