<template>
  <aside
    ref="sidebar"
    class="side"
  >
    <BaseButton
      v-if="!isMobile"
      :class="['side-toggle', { visible: isSidebarVisible }]"
      @click="toggleSidebarWidth"
    >
      <IconWrapper :icon="icons.chevronDown" />
    </BaseButton>
    <div class="side-wrapper">
      <div class="site-links">
        <SideBarMenu
          :items="siteLinks"
          :isVisible="isSidebarVisible"
        />
        <SideBarDivider />
        <SideBarMenu
          :items="outerResourceLinks"
          :isVisible="isSidebarVisible"
        />
      </div>
      <div class="tech-links">
        <SideBarMenu
          :items="techSupportLinks"
          :isVisible="isSidebarVisible"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useWindowSize } from '@vueuse/core';
  import { ref, watchEffect } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useDeviceStore } from '@stores/deviceStore/store';
  import { useSidebarStore } from '@stores/sidebarStore/store';
  import { getCSSVariable, setCSSVariable } from '@utils/cssVar';
  import { icons } from '@/utils/icons';
  import { outerResourceLinks, siteLinks, techSupportLinks } from '../consts';
  import SideBarDivider from '../SideBarDivider/SideBarDivider.vue';
  import SideBarMenu from '../SideBarMenu/SideBarMenu.vue';

  const { width: windowWidth } = useWindowSize();

  const { isMobile } = storeToRefs(useDeviceStore());
  const { sidebarState } = storeToRefs(useSidebarStore());

  const sidebarDefaultWidth = '240px';
  const sidebarThinWidth = '70px';
  const sidebarHiddenWidth = '0px';

  const sidebarWidth = ref<string>(sidebarDefaultWidth);
  const isSidebarVisible = ref<boolean>(false);

  const getSidebarWidth = () => getCSSVariable('--sidebar-width');

  const setSidebarWidth = (value: string, visibility: boolean) => {
    setCSSVariable('--sidebar-width', value);
    isSidebarVisible.value = visibility;
  };

  const toggleSidebarWidth = () => {
    if (getSidebarWidth() === sidebarWidth.value) {
      setSidebarWidth(sidebarThinWidth, false);
      return;
    }
    if (getSidebarWidth() === sidebarThinWidth) {
      setSidebarWidth(sidebarWidth.value, true);
      return;
    }
  };

  watchEffect(() => {
    if (isMobile.value) {
      if (sidebarState.value) {
        setSidebarWidth(windowWidth.value + 'px', false);
      } else setSidebarWidth(sidebarHiddenWidth, false);
    } else {
      setSidebarWidth(sidebarThinWidth, false);
    }
  });
</script>

<style scoped lang="scss">
  .side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: var(--sidebar-width);
    background: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    position: fixed;
    left: 0;
    top: 0;
    padding-top: calc(var(--space-4xl) + var(--header-height));
    transition: var(--transition-default);
    padding-bottom: var(--space-m);

    ::-webkit-scrollbar {
      display: none;
    }

    .side-wrapper {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .side-toggle {
      transform: rotate(-90deg);
      width: var(--space-3xl);
      height: var(--space-3xl);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: var(--color-background-primary);
      box-shadow: 0 4px 10px rgb(0 0 0 / 4%);
      position: fixed;
      left: calc(var(--sidebar-width) - var(--space-m));
      top: 80px;
      transition: var(--transition-default);

      :deep(i) {
        transition: var(--transition-default);
      }

      :deep(path) {
        fill: var(--color-font-secondary);
      }

      &:hover {
        background: var(--color-background-secondary);
      }

      &.visible {
        transform: rotate(90deg);
      }
    }

    .site-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-l);
    }

    .tech-links {
      margin-top: var(--space-l);
    }
  }
</style>
