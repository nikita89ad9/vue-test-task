<template>
  <Select
    v-model="selectedValue"
    :options="selectOptions"
    class="navigation-panel__select"
    @update:modelValue="emit('update:modelValue', selectedValue)"
    @click="isOpen = !isOpen"
  >
    <BaseInput
      :modelValue="placeholder"
      :placeholder="triggerPlaceholder"
      class="input-trigger"
      variant="contained"
      readonly
      :clearable="false"
    >
      <template #append-icon>
        <RotatedIconWrapper :isOpen="isOpen">
          <component :is="icons.chevronDown" />
        </RotatedIconWrapper>
      </template>
    </BaseInput>
  </Select>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import Select from '@/components/Select/Select.vue';
  import { icons } from '@/utils/icons';
  import type { SelectOption } from '@/types/Select';
  import RotatedIconWrapper from '../RotatedIconWrapper.vue';

  const props = defineProps<{
    triggerPlaceholder: string;
    modelValue: SelectOption;
    selectOptions: SelectOption[];
  }>();

  const isOpen = ref(false);

  const emit = defineEmits<(e: 'update:modelValue', value: SelectOption) => void>();

  const selectedValue = ref(props.modelValue);

  const placeholder = computed(() => selectedValue.value.name);
</script>

<style scoped lang="scss">
  .navigation-panel__select {
    width: 100%;
  }

  .input-trigger {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    align-self: flex-start;
  }
</style>
