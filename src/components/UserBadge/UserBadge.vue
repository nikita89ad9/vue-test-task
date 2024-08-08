<template>
  <div class="badge">
    <BaseAvatar
      :src="avatarSrc ?? '/avatarSample.png'"
      :size="avatarSize"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import BaseAvatar from '@common/BaseAvatar/BaseAvatar.vue';

  defineProps<{
    avatarSrc?: string | null;
    avatarSize?: string;
  }>();
</script>

<style scoped lang="scss">
  .badge {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    color: var(--color-font-primary);
    font-size: var(--font-size-s);

    @include w-max($md) {
      font-size: var(--font-size-xs);
    }
  }
</style>
