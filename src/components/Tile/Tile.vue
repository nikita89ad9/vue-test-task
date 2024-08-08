<template>
  <div :class="['tile', { tile_neutral: neutral }]">
    <slot />
    <IconWrapper
      v-if="deletable"
      :icon="icons.close"
      class="tile__svg-close"
      @click="$emit('delete')"
    />
  </div>
</template>

<script setup lang="ts">
  import IconWrapper from '@components/IconWrapper.vue';
  import { icons } from '@/utils/icons';

  defineProps<{
    deletable?: boolean;
    neutral?: boolean;
  }>();

  defineEmits(['delete']);
</script>

<style scoped lang="scss">
  .tile {
    display: flex;
    align-items: center;
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-primary);
    width: fit-content;
    border-radius: var(--space-border-xs);
    color: #fff;
    gap: var(--space-s);
    transition: var(--transition-default);
    font-size: var(--font-size-2xs);
    text-wrap: nowrap;
    cursor: pointer;

    &:hover {
      background: var(--color-primary-hover);
    }

    &_neutral {
      background: var(--color-extra-light);
      color: var(--color-font-secondary);

      &:hover {
        background: #d6d6d6;
      }
    }

    &__svg-close {
      cursor: pointer;
      width: 12px;
      height: 12px;

      :deep(path) {
        fill: #fff;
      }
    }
  }
</style>
