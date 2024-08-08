<template>
  <Select
    v-model="modelValue"
    :options="options"
    placeholder="Sorted by"
    class="moderation-select"
  >
    <div class="selected-value">
      <div class="selected-value__activator">
        <IconWrapper
          class="selected-value__icon"
          :icon="iconPath"
        />
        <span class="selected-value__text"> {{ displayValue }}</span>
      </div>
      <IconWrapper
        class="selected-value__icon"
        :icon="icons.chevronDown"
      />
    </div>
  </Select>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import IconWrapper from '@/components/IconWrapper.vue';
  import Select from '@/components/Select/Select.vue';
  import { icons } from '@/utils/icons';

  const props = defineProps<{
    modelValue: { name: string; value: string };
    options: { name: string; value: string }[];
    iconName: string;
  }>();

  const modelValue = ref(props.modelValue);

  const iconPath = computed(() => icons[props.iconName as keyof typeof icons]);

  const displayValue = computed(() => {
    const current = props.options.find(item => item.value === modelValue.value.value);
    return current?.name;
  });
</script>

<style scoped lang="scss">
  .moderation-select {
    display: flex;
    margin-left: auto;
    flex-grow: 0;
    height: auto;
  }

  .selected-value {
    min-width: 200px;
    display: flex;
    align-items: center;
    border: var(--border-light);
    border-radius: var(--space-border-s);
    padding: var(--space-xs) var(--space-m);
    gap: var(--space-m);
    height: 42.4px;

    &__activator {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      width: 100%;
    }

    &__icon {
      width: var(--space-l);
      height: var(--space-l);

      :deep(path) {
        fill: var(--color-font-secondary);
      }
    }

    &__text {
      align-items: flex-end;
      font-size: var(--font-size-m);
      cursor: pointer;
      color: var(--color-font-secondary);
    }
  }
</style>
