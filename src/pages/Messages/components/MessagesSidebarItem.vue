<template>
  <div
    v-if="item"
    class="messages-list__item message-card"
  >
    <UserBadge avatarSize="40">
      <div class="message-card__content">
        <p class="message-card__author">
          {{ dialogCompanionName }}
        </p>
        <p class="message-card__preview">{{ messagePreview }}</p>
      </div>
    </UserBadge>
    <div class="message-card__counter">3</div>
    <div class="message-card__dropdown-wrap">
      <div class="message-card__dropdown">
        <BaseDropdown
          closeOnClickOutside
          class="dropdown_right dropdown_bottom"
        >
          <template #trigger>
            <IconWrapper
              :icon="icons.moreVertical"
              class="action-icon"
            >
            </IconWrapper>
          </template>
          <template #content>
            <BaseMenu class="message-card__menu">
              <HeaderMenuItem
                v-for="item in menuItems"
                :key="item.text"
                @click="runChatAction(item.name)"
              >
                <template #icon>
                  <IconWrapper :icon="item.icon"> </IconWrapper>
                </template>
                <template #text>
                  {{ $t(`messages.chatMenu.${item.name}`) }}
                </template>
              </HeaderMenuItem>
            </BaseMenu>
          </template>
        </BaseDropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';

  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseMenu from '@/components/common/BaseMenu/BaseMenu/BaseMenu.vue';
  import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import { useUserStore } from '@/stores/userStore/store';
  import type { IDialogCreateDTOResp } from '@/services/dialogs/dialogs.types';
  import { icons } from '@/utils/icons';
  import type { ChatMenuItem } from '../types';

  enum chatContextActions {
    DELETE = 'delete',
    BLOCK = 'block',
  }

  const props = defineProps<{
    item: IDialogCreateDTOResp;
  }>();

  const emits = defineEmits<{
    deleteChat: [];
    blockChat: [];
  }>();

  const { user } = storeToRefs(useUserStore());

  const messagePreview = computed(() => {
    if (!props.item.lastMessage) {
      return '';
    }

    if (props.item.lastMessage.senderId === user.value?.id) {
      return `You: ${props.item.lastMessage.text}`;
    } else {
      return props.item.lastMessage.text;
    }
  });

  const dialogCompanion = computed(() => {
    if (props.item.participants.length <= 1) {
      return user.value;
    } else {
      return props.item.participants.find(chatter => chatter.id !== user.value?.id);
    }
  });

  const dialogCompanionName = computed(() => {
    if (!dialogCompanion.value?.name) {
      return dialogCompanion.value?.email;
    }

    if (dialogCompanion.value.surname && dialogCompanion.value.name) {
      return dialogCompanion.value.name + ' ' + dialogCompanion.value.surname;
    } else {
      return dialogCompanion.value.name;
    }
  });

  const menuItems: ChatMenuItem[] = [
    { icon: icons.block, text: 'Block', name: chatContextActions.BLOCK },
    { icon: icons.delete, text: 'Delete', name: chatContextActions.DELETE },
  ];

  const runChatAction = (actionName: string) => {
    switch (actionName) {
      case chatContextActions.BLOCK:
        emits('blockChat');
        break;
      case chatContextActions.DELETE:
        emits('deleteChat');
        break;
      default:
        break;
    }
  };
</script>

<style scoped lang="scss">
  .message-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background-secondary);
    padding: var(--space-l) var(--space-xl);
    cursor: pointer;
    transition: var(--transition-even);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    position: relative;
    max-width: 338px;

    &__dropdown-wrap {
      position: absolute;
      right: calc(var(--space-xl) - 1px);
      top: 50%;
      transform: translate(0, -50%);
      background: var(--color-background-primary);
      height: var(--space-3xl);
      width: var(--space-3xl);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: var(--transition-even);
      z-index: 1;

      &:hover {
        background: var(--color-font-third);
      }
    }

    &:hover {
      background-color: var(--color-background-primary);
      border-top: 1px solid var(--color-background-third);
      border-bottom: 1px solid var(--color-background-third);

      .message-card__dropdown-wrap {
        opacity: 1;
      }
    }

    &__dropdown {
      height: var(--space-xl);
      width: var(--space-xl);
    }

    &__menu {
      position: relative;
    }

    &__content {
      padding-right: 12px;
      max-width: 214px;
    }

    &__author {
      font-size: var(--font-size-s);
      margin-bottom: var(--space-2xs);
      font-weight: 600;
    }

    &__preview {
      color: var(--color-font-secondary);
      font-size: var(--font-size-xs);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__counter {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-primary);
      color: var(--color-font-light);
      font-size: var(--font-size-2xs);
      width: var(--space-xl);
      height: var(--space-xl);
      border-radius: 50%;
    }

    @include w-max($lg) {
      width: 88px;

      &__counter,
      &__dropdown-wrap,
      &__content {
        display: none;
      }
    }

    @include w-max($sm) {
      padding: var(--space-s) 6px var(--space-s) var(--space-s);
      width: 50px;
      max-width: 272px;

      &__dropdown-wrap {
        right: calc(var(--space-s));
      }
    }
  }

  .action-icon {
    :deep(path) {
      fill: var(--color-font-primary);
    }
  }
</style>

<style lang="scss">
  .message-card {
    @include w-max($sm) {
      .badge {
        max-width: 212px;
        overflow: hidden;

        img {
          width: var(--space-3xl);
          height: var(--space-3xl);
        }
      }

      .message-card__content {
        height: var(--space-3xl);
      }

      .message-card__author {
        font-size: var(--font-size-xs);
      }

      .message-card__preview {
        font-size: var(--font-size-2xs);
      }
    }
  }
</style>
