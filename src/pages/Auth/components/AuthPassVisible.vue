<template>
  <span class="auth-pass">
    <AuthPassHiddenIcon
      v-if="modelValue"
      class="auth-pass__icon"
      @click="handleUpdate"
    />
    <AuthPassShownIcon
      v-else
      class="auth-pass__icon"
      @click="handleUpdate"
    />
  </span>
</template>

<script setup lang="ts">
  import AuthPassHiddenIcon from '@icons/AuthIcons/AuthPassHiddenIcon.vue';
  import AuthPassShownIcon from '@icons/AuthIcons/AuthPassShownIcon.vue';

  const props = defineProps<{ modelValue: boolean }>();

  const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

  const handleUpdate = () => {
    emit('update:modelValue', !props.modelValue);
  };
</script>

<style scoped lang="scss">
  .auth-pass {
    display: flex;
    position: relative;
    width: var(--space-l);
    height: var(--space-l);
    flex-shrink: 0;
    margin-right: var(--space-xs);

    :deep(svg.auth-pass__icon) {
      width: 100%;
      height: 100%;
    }
  }
</style>
