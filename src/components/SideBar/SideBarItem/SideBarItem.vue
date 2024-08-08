<template>
  <BaseMenuItem>
    <RouterLink
      :to="{ name: routeName }"
      :class="['item', { item_active: isItemActive }]"
      @click="isMobile && toggleSidebarState()"
    >
      <slot name="icon" />
      <slot name="text" />
    </RouterLink>
  </BaseMenuItem>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';

  import BaseMenuItem from '@common/BaseMenu/BaseMenuItem/BaseMenuItem.vue';
  import { useDeviceStore } from '@/stores/deviceStore/store';
  import { useSidebarStore } from '@/stores/sidebarStore/store';
  import router from '@/router';

  const props = defineProps<{ routeName: string }>();

  const { toggleSidebarState } = useSidebarStore();
  const { isMobile } = storeToRefs(useDeviceStore());

  const route = computed(() => router.currentRoute.value);
  const isItemActive = computed(() => route.value.matched.some(el => el.name === props.routeName));
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-xl);
    border-left: 3px solid transparent;
    background: var(--color-background-primary);
    color: var(--color-font-secondary);
    padding: var(--space-s) var(--space-l);
    font-size: var(--font-size-s);
    transition: var(--transition-default);
    width: 100%;
    white-space: nowrap;

    &:deep(path) {
      fill: var(--color-font-secondary);
    }

    &:hover {
      border-color: var(--color-primary);
      background: var(--color-background-third);
    }

    &_active {
      color: var(--color-primary);
      border-color: var(--color-primary);
      background: var(--color-background-third);

      &:deep(path) {
        fill: var(--color-primary);
      }
    }
  }
</style>
