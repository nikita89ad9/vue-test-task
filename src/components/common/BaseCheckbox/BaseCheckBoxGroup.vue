<template>
  <div class="checkbox-group">
    <BaseCheckbox
      v-for="checkbox in checkboxes"
      :key="checkbox.name"
      v-model="checkbox.modelValue"
      class="checkbox-group__checkbox"
      :onUpdate:modelValue="changeGroup"
    >
      {{ checkbox.name }}
    </BaseCheckbox>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { UIUniqid } from '@/utils/UIUniqid';
  import BaseCheckbox from './BaseCheckbox.vue';
  import type { ICheckbox, TCheckboxProp } from './types';

  const props = defineProps<{ modelValue: TCheckboxProp[] }>();
  const emits = defineEmits<(e: 'update:modelValue', checkboxes: ICheckbox[]) => void>();

  const checkboxes = ref<ICheckbox[]>(
    props.modelValue.map((el: TCheckboxProp) => {
      return { ...el, id: UIUniqid() };
    })
  );

  const changeGroup = () => {
    emits('update:modelValue', checkboxes.value);
  };
</script>

<style scoped lang="scss">
  .checkbox-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;

    &__checkbox {
      gap: var(--space-l);
    }
  }
</style>
