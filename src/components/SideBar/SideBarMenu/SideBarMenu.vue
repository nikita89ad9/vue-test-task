<template>
  <BaseMenu class="menu">
    <SideBarItem
      v-for="item in items"
      :key="item.name"
      :routeName="item.routeName"
      :title="item.name"
      :isVisible="isVisible"
    >
      <template
        v-if="item.icon"
        #icon
      >
        <IconWrapper
          :icon="item.icon"
          class="icon"
        />
      </template>
      <template #text>
        <span>
          {{ item.name }}
        </span>
      </template>
    </SideBarItem>
  </BaseMenu>
</template>

<script setup lang="ts">
  import IconWrapper from '@components/IconWrapper.vue';
  import SideBarItem from '@components/SideBar/SideBarItem/SideBarItem.vue';
  import type { SidebarItem } from '@components/SideBar/types';
  import BaseMenu from '@common/BaseMenu/BaseMenu/BaseMenu.vue';

  defineProps<{
    items: SidebarItem[];
    isVisible: boolean;
  }>();
</script>

<style scoped lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-s);
    background: transparent;
    overflow-x: hidden;

    :deep(svg) {
      width: var(--space-xl);
      height: var(--space-xl);
    }
  }
</style>
