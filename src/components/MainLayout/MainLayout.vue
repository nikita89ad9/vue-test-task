<template>
  <div class="main-layout">
    <div class="fixed">
      <Header class="header" />
      <SideBar class="sidebar" />
    </div>

    <div
      id="pageLayout"
      class="page-layout"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import Header from '@/components/Header/Header/Header.vue';
  import SideBar from '@/components/SideBar/SideBar/SideBar.vue';
</script>

<style scoped lang="scss">
  .main-layout {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-secondary);
    overflow-x: hidden;

    .fixed {
      top: 0;
      left: 0;
      width: calc(100vw - var(--sidebar-width));
      height: 100%;
    }

    .page-layout {
      margin-left: var(--sidebar-width);
      height: calc(100vh - var(--header-height));
      flex-grow: 1;
      padding: var(--space-3xl);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      transition: var(--transition-default);

      @include w-max($lg) {
        padding: var(--space-l);
      }
    }

    @include w-max($sm) {
      .page-layout {
        padding: var(--space-s);
      }
    }
  }
</style>
