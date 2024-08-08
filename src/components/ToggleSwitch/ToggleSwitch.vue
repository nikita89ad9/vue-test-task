<template>
  <div
    class="toggle-switch"
    @click="toggleSwitch"
  >
    <input
      v-model="isChecked"
      :checked="checkState"
      type="checkbox"
      class="checkbox"
    />
    <div class="slider round">
      <slot name="prepend-icon" />
      <slot name="append-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps<{
    modelValue: boolean;
  }>();

  const emits = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const isChecked = ref(props.modelValue);

  const checkState = computed(() => props.modelValue);

  const toggleSwitch = () => {
    isChecked.value = !isChecked.value;

    emits('update:modelValue', isChecked.value);
  };
</script>

<style scoped lang="scss">
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    user-select: none;
  }

  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    transition: 0.2s;
    border-radius: 34px;
    background-color: var(--color-primary);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .slider::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }

  .checkbox:checked + .slider::before {
    transform: translateX(26px);
  }
</style>
