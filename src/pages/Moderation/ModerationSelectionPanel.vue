<template>
  <BaseLayout>
    <div class="moderation-articles__panel moderation-panel">
      <div class="moderation-panel__controls">
        <div class="moderation-panel__top">
          <slot name="filters"></slot>
        </div>
        <div class="moderation-panel__bottom">
          <div class="moderation-panel__search">
            <BaseCheckbox
              v-model="modelValue"
              :title="checkboxTitle"
              name="selectAll"
              @update:modelValue="(value: boolean) => emits('updateValue', value)"
            />
            <slot name="search"></slot>
          </div>
          <p class="moderation-panel__counter">{{ counterPlaceholder }} {{ counter }}</p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import BaseCheckbox from '@/components/common/BaseCheckbox/BaseCheckbox.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';

  const props = defineProps<{
    checkboxTitle: string;
    checkboxValue: boolean;
    counter: number;
    counterPlaceholder: string;
  }>();

  const emits = defineEmits<(e: 'updateValue', value: boolean) => void>();

  const modelValue = ref(props.checkboxValue);
</script>

<style scoped lang="scss">
  .moderation-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-xl);

    .checkbox {
      max-width: var(--space-2xl);
    }

    &__controls {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-m);
    }

    &__search {
      width: fit-content;
      display: flex;
      justify-content: space-between;
      gap: var(--space-s);
    }

    &__top {
      display: flex;
      gap: var(--space-s);

      @include w-max($md) {
        flex-direction: column;

        :deep(.dropdown),
        :deep(.input) {
          width: 100%;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: var(--space-s);

      @include w-max($md) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__counter {
      width: max-content;
      display: flex;
      justify-content: flex-end;
      justify-self: flex-end;
      flex-shrink: 0;
      font-size: var(--font-size-s);

      @include w-max($md) {
        align-self: flex-end;
      }
    }
  }
</style>
