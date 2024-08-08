<template>
  <li :class="['menu-item', { 'menu-item_disabled': disabled }]">
    <slot />
  </li>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{ disabled?: boolean }>(), {
    disabled: false,
  });
</script>

<style scoped lang="scss">
  .menu-item {
    list-style-type: none;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &_disabled {
      cursor: not-allowed;
    }
  }
</style>
