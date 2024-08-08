<template>
  <div class="multiselect__controls">
    <button
      :disabled="resetBtnDisabled"
      @click="() => emit('handleSelection', false)"
    >
      {{ $t('multiselect.reset') }}
    </button>
    <button
      :disabled="selectBtnDisabled"
      @click="() => emit('handleSelection', true)"
    >
      {{ $t('multiselect.selectAll') }}
    </button>
    <span class="">
      {{ selectedLength }}
      {{ $t('multiselect.outOf') }}
      {{ totalLength }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    selectedLength: number;
    totalLength: number;
  }>();

  const emit = defineEmits<(e: 'handleSelection', value: boolean) => void>();

  const resetBtnDisabled = computed<boolean>(() => {
    return props.selectedLength === 0;
  });

  const selectBtnDisabled = computed<boolean>(() => {
    return props.selectedLength === props.totalLength;
  });
</script>

<style scoped lang="scss">
  .multiselect__controls {
    background: var(--color-background-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-m);
    border-top: 1px solid var(--color-background-third);

    > button,
    span {
      font-size: var(--font-size-s);
      background: transparent;
    }

    > button {
      color: var(--color-primary);
      font-family: var(--font-manrope-semibold);
      cursor: pointer;
    }

    > button:disabled {
      color: var(--color-font-secondary);
      font-family: var(--font-manrope-regulra);
      cursor: auto;
    }

    > span {
      color: var(--color-font-secondary);
    }
  }
</style>
