<template>
  <div
    class="notifications-list__item notifications-item"
    @click="emit('redirectToItem', item.itemID)"
  >
    <div class="notifications-item__main">
      <UserBadge
        avatarSize="40"
        :avatarSrc="item.authorAvatar ? getFilePath(item.authorAvatar) : null"
        class="notifications-item__info"
      >
        <div class="notifications-item__content">
          <p class="notifications-item__author">{{ item.author }}</p>
          <p class="notifications-item__preview">{{ item.message }}</p>
        </div>
      </UserBadge>
      <p
        v-if="item.itemReference"
        class="notifications-item__reference"
      >
        {{ $t('notifications.reference') }}
        <a
          class="notifications-item__link"
          :href="item.itemID"
        >
          {{ item.itemReference }}
        </a>
      </p>
    </div>
    <span class="notifications-item__indicator"></span>
  </div>
</template>

<script setup lang="ts">
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import { getFilePath } from '@/utils/getFilePath';
  import type { NotificationItem } from './types';

  defineProps<{
    item: NotificationItem;
  }>();

  const emit = defineEmits<(e: 'redirectToItem', value: string) => void>();
</script>

<style scoped lang="scss">
  .notifications-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background-secondary);
    padding: var(--space-s) var(--space-xl);
    transition: var(--transition-even);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: var(--color-extra-light);
    }

    &__main {
      width: calc(100% - var(--space-l));
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-s);
    }

    &__indicator {
      display: flex;
      width: var(--space-xs);
      height: var(--space-xs);
      border-radius: 50%;
      background: red;
      cursor: pointer;
    }

    &__reference {
      font-size: var(--font-size-xs);
      color: var(--color-font-primary);
    }

    &__link {
      color: var(--color-extra-link-primary);
    }

    &__info {
      width: 100%;
    }

    &__content {
      padding-right: var(--space-s);
      max-width: 100%;
      overflow: hidden;
    }

    &__author {
      font-size: var(--font-size-s);
      margin-bottom: var(--space-2xs);
      font-weight: 600;
    }

    &__preview {
      color: var(--color-font-secondary);
      font-size: var(--font-size-xs);
      max-height: 42px;
      overflow: hidden;
      line-height: 1.5;
      flex-wrap: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
