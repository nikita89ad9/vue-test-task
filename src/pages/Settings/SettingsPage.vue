<template>
  <div class="layout">
    <SettingsSideBar />
    <div class="content"><RouterView /></div>
  </div>
</template>

<script setup lang="ts">
  import SettingsSideBar from './components/SettingsSideBar.vue';
</script>

<style scoped lang="scss">
  .layout {
    width: 100%;
    background: var(--color-background-primary);
    margin: 0;
    border-radius: var(--space-border-s);
    box-shadow: var(--container-shadow);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    @include w-max($lg) {
      flex-direction: column;
    }
  }

  .content {
    display: flex;
    align-items: start;
    justify-content: start;
    width: 75%;
    margin: var(--space-2xl);

    @include w-max($lg) {
      align-items: center;
      width: auto;
      margin: var(--space-2xl);
    }
  }
</style>
