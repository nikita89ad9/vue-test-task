<template>
  <div
    class="message-item"
    :class="`message-item_${position}`"
  >
    <div class="message-item__info">
      <UserBadge
        class="message-item__author"
        avatarSize="40"
      />
      <span class="message-item__date">{{ formattedDate }}</span>
    </div>
    <div class="message-item__content">
      <div
        v-for="msg in msgItem"
        :key="msg.id"
        v-dompurify-html="msg.text"
        class="message-item__text"
        @click.right.prevent="emits('rightClick', msg)"
      />
      <div
        v-if="isMessageSendPending"
        class="message-item__pending"
      >
        <Loader />
        <div class="message-item__text">
          {{ sendingMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';

  import Loader from '@components/Loader/Loader.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import { useMessagesStore } from '@/stores/messagesStore/store';
  import type { IWssGetMessageDTOResp } from '@/services/dialogs/dialogs.types';
  import { formatDate } from '@/utils/formatDate';

  const formatter = 'ddd HH:mm';

  const props = defineProps<{
    msgItem: IWssGetMessageDTOResp[];
    position: string;
  }>();

  const emits = defineEmits<{
    rightClick: [msgItem: IWssGetMessageDTOResp];
  }>();

  const { isMessageSendPending, sendingMessage } = storeToRefs(useMessagesStore());

  const formattedDate = computed(() => formatDate(props.msgItem[0].createdAt, formatter));

  const messageFlexPositioning = computed(() => {
    if (props.position === 'left') return 'flex-start';
    else return 'flex-end';
  });
</script>

<style lang="scss">
  @include w-max($sm) {
    .message-item__author {
      img {
        width: var(--space-2xl);
        height: var(--space-2xl);
      }
    }
  }
</style>

<style scoped lang="scss">
  .message-item {
    display: flex;
    align-items: flex-end;
    gap: var(--space-s);

    &__pending {
      display: flex;
      align-items: center;
      gap: var(--space-m);
    }

    &__text {
      background: #d8ffd3;
      border-radius: var(--space-border-s);
      padding: var(--space-m);
      font-size: var(--font-size-xs);
      margin-bottom: var(--space-xs);
      width: fit-content;
      cursor: pointer;
      transition: var(--transition-default);

      &:hover {
        background: #a2ee8d;
      }
    }

    &_left {
      .message-item__text {
        background: var(--color-third);
        filter: brightness(160%);
        cursor: pointer;
        transition: var(--transition-default);

        &:hover {
          filter: brightness(130%);
        }
      }
    }

    &__content {
      column-gap: var(--space-xs);
      display: flex;
      flex-direction: column;
      align-items: v-bind(messageFlexPositioning);
      overflow-wrap: anywhere;
      max-width: 70%;
    }

    &__info {
      display: flex;
      flex-direction: column;
      margin-bottom: calc(var(--space-5xl) * -1);
    }

    &__date {
      font-size: var(--font-size-2xs);
      color: var(--color-font-secondary);
      font-weight: 600;
    }

    &__author {
      margin-bottom: var(--space-xs);
    }

    @include w-max($sm) {
      &__text {
        padding: var(--space-xs);
      }

      .message-item__author {
        img {
          width: var(--space-l);
          height: var(--space-l);
        }
      }
    }
  }

  .message-item_right {
    flex-direction: row-reverse;

    .message-item__info {
      align-items: flex-end;
    }
  }
</style>
