<template>
  <div class="messages-chat">
    <div class="messages-chat__header messages-header">
      <div class="messages-header__user">
        <UserBadge size="50">
          <div class="messages-header__title">
            <span class="messages-header__name">
              {{ dialogHeadingName }}
            </span>
            <span class="messages-header__status"></span>
          </div>
        </UserBadge>
      </div>
      <IconWrapper
        :icon="icons.close"
        class="messages-header__close"
        @click="emits('messagesClose')"
      />
    </div>
    <div
      v-if="messages.length"
      ref="content"
      class="messages-chat__content messages-content"
    >
      <ContextMenu ref="ctxMenu">
        <template #options>
          <div v-if="isMenuPersonal">
            <div
              v-for="item in ctxMenuPersonalItems"
              :key="item.name"
              class="ctxMenu__item"
              @click="item.action"
            >
              {{ item.name }}
            </div>
          </div>
          <div v-else>
            <div
              v-for="item in ctxMenuCommonItems"
              :key="item.name"
              class="ctxMenu__item"
              @click="item.action"
            >
              {{ item.name }}
            </div>
          </div>
        </template>
      </ContextMenu>
      <BaseModal ref="modal">
        <template #modal="{ close }">
          <div class="modal-content">
            <p>Are you sure ?</p>
            <div class="modal-buttons">
              <BaseButton @click="submitMessageDelete(close)"> Submit </BaseButton>
              <BaseButton @click="close"> Cancel </BaseButton>
            </div>
          </div>
        </template>
      </BaseModal>
      <MessagesChatItem
        v-for="(item, i) in messages"
        :key="messages[i][0].id"
        :msgItem="item"
        :position="item[0].sender.id !== user?.id ? 'left' : 'right'"
        class="messages-chat__content__item"
        @rightClick="openContextMenu"
      />
      <Transition name="scrollButton">
        <BaseButton
          v-if="isScrollButtonVisible"
          class="messages-chat__content-scroll_button"
          @click="scrollToBottom"
        >
          <IconWrapper :icon="icons.arrowDown" /> {{ scrollButtonText }}
        </BaseButton>
      </Transition>
    </div>
    <div
      ref="footer"
      class="messages-chat__footer"
    >
      <MessagesEditor
        :dialogId="dialogData?.id"
        @sendMessage="scrollToBottom"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useElementSize, useScroll } from '@vueuse/core';
  import { computed, nextTick, ref, watch } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import ContextMenu from '@/components/ContextMenu/ContextMenu.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import { useMessagesStore } from '@/stores/messagesStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import type {
    IDialogCreateDTOResp,
    IWssGetMessageDTOResp,
    IWssGetMessagesDTOResp,
  } from '@/services/dialogs/dialogs.types';
  import { constVoid } from '@/utils/function';
  import { icons } from '@/utils/icons';
  import MessagesChatItem from './MessagesChatItem.vue';
  import MessagesEditor from './MessagesEditor.vue';
  import type { ContextMenuItems } from '../types';

  const props = defineProps<{
    dialogMessages: IWssGetMessagesDTOResp;
    dialogData: IDialogCreateDTOResp | undefined;
  }>();

  const emits = defineEmits(['messagesClose']);

  const autoscrollBreakpoint = 300;

  const { user } = storeToRefs(useUserStore());
  const { deleteMessage } = useMessagesStore();

  const footer = ref<HTMLElement | null>(null);
  const content = ref<HTMLElement | null>(null);
  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const isScrollButtonVisible = ref<boolean>(false);
  const scrollButtonText = ref<string>('');

  const ctxMenu = ref<InstanceType<typeof ContextMenu> | null>(null);
  const messageData = ref<IWssGetMessageDTOResp>();

  const ctxMenuCommonItems: ContextMenuItems[] = [
    {
      name: 'Reply',
      action: constVoid,
    },
  ];

  const ctxMenuPersonalItems: ContextMenuItems[] = [
    ...ctxMenuCommonItems,
    {
      name: 'Delete',
      action: () => {
        modal.value?.toggleModalStatus();
      },
    },
  ];

  const isMenuPersonal = computed(() => messageData.value?.senderId === user.value?.id);

  const openContextMenu = (msgItem: IWssGetMessageDTOResp) => {
    messageData.value = msgItem;
    ctxMenu.value?.openPopup();
  };

  const submitMessageDelete = (callback: () => void) => {
    if (messageData.value) deleteMessage(messageData.value?.id);
    callback();
  };

  const { y: scrollTopPosition } = useScroll(content);

  const isScrollOverBreakpoint = computed(() => {
    if (!content.value) return;
    return (
      content.value?.scrollHeight - (content.value?.offsetHeight + scrollTopPosition.value) >
      autoscrollBreakpoint
    );
  });

  const { height } = useElementSize(footer);

  const footerHeight = computed(() => height.value + 'px');

  const messages = computed(() =>
    props.dialogMessages.reduce((prev: IWssGetMessagesDTOResp[], curr: IWssGetMessageDTOResp) => {
      if (prev.length && curr.sender.id === prev[prev.length - 1][0].sender.id) {
        prev[prev.length - 1].push(curr);
      } else {
        prev.push([curr]);
      }
      return prev;
    }, [])
  );

  const dialogCompanion = computed(
    () => props.dialogData?.users.find(companion => companion.id !== user.value?.id)
  );

  const dialogHeadingGroupName = computed(
    () =>
      props.dialogData?.name ??
      props.dialogData?.users.map(chatter => chatter.name + ' ' + chatter.surname).join(', ')
  );

  const dialogHeadingUserName = computed(() => {
    const users = props.dialogData?.users;
    const companion = dialogCompanion.value;

    if (users?.length === 1) {
      return 'Literally you';
    }

    if (companion?.name) {
      const fullName = companion.surname
        ? `${companion.name} ${companion.surname}`
        : companion.name;

      return fullName || companion.email;
    }

    return companion?.email;
  });

  const dialogHeadingName = computed(() => {
    if (props.dialogData?.isGroup) return dialogHeadingGroupName.value;
    else return dialogHeadingUserName.value;
  });

  const scrollToBottom = () => {
    content.value?.scrollTo({ top: content.value.scrollHeight });
    scrollButtonText.value = '';
    isScrollButtonVisible.value = false;
  };

  watch(
    () => props.dialogData?.id,
    async () => {
      await nextTick();
      scrollToBottom();
    },
    { deep: false }
  );

  watch(
    () => props.dialogMessages.length,
    async (newVal, oldVal) => {
      await nextTick();

      if (newVal <= oldVal) return; // for cases when messages get deleted by other users

      if (!isScrollOverBreakpoint.value) {
        scrollToBottom();
      } else {
        const lastMessageSenderId = props.dialogMessages[newVal - 1]?.senderId;
        if (user.value?.id === lastMessageSenderId) {
          scrollToBottom();
        } else {
          scrollButtonText.value = ' New message';
        }
      }
    }
  );

  watch(isScrollOverBreakpoint, () => {
    if (isScrollOverBreakpoint.value) {
      isScrollButtonVisible.value = true;
    } else {
      isScrollButtonVisible.value = false;
    }
  });
</script>

<style lang="scss">
  .messages-header__user {
    @include w-max($sm) {
      .badge {
        img {
          width: var(--space-2xl);
          height: var(--space-2xl);
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  .ctxMenu__item {
    padding: var(--space-xs);
    transition: var(--transition-default);
    font-size: var(--font-size-s);

    &:hover {
      cursor: pointer;
      background-color: var(--color-background-secondary);
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-m);
    font-size: var(--font-size-s);

    .modal-buttons {
      display: flex;
      justify-content: space-between;
      gap: var(--space-m);
    }
  }

  .messages-chat {
    background: var(--color-background-primary);
    width: 100%;
    height: 100%;
    position: relative;

    &__header {
      height: 80px;
      align-items: center;
      padding: 0 var(--space-xl);
      border-bottom: 1px solid var(--color-extra-light);
    }

    &__header,
    &__footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid var(--color-extra-light);
      align-items: flex-end;
      height: max-content;
    }

    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: var(--space-5xl) var(--space-5xl) calc(2 * var(--space-5xl)) var(--space-5xl);
      max-height: calc(100% - 80px - v-bind(footerHeight));
      gap: var(--space-6xl);
      overflow-y: auto;

      &-scroll_button {
        position: absolute;
        bottom: calc(v-bind(footerHeight) + var(--space-3xl));
        border-radius: 100px;
        padding: var(--space-s);
        transition: var(--transition-default);

        :deep(path) {
          fill: white;
        }
      }

      &__item:first-child {
        margin-top: var(--space-s);
      }
    }

    @include w-max($lg) {
      margin-left: 94px;
    }

    @include w-max($sm) {
      margin-left: 56px;

      &__content {
        padding-left: var(--space-m);
        padding-right: var(--space-m);
      }
    }
  }

  .messages-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__close {
      cursor: pointer;
      transition: var(--transition-default);

      :deep(path) {
        stroke: var(--color-font-secondary);
      }

      &:hover {
        :deep(path) {
          fill: var(--color-font-primary);
        }
      }
    }

    &__dropdown {
      height: var(--space-xl);
    }

    &__user {
      display: flex;
      gap: var(--space-s);
    }

    &__title {
      display: flex;
      align-items: center;
      gap: var(--space-s);
    }

    &__name {
      font-size: var(--font-size-xl);
      color: var(--color-font-primary);
    }

    &__status {
      display: block;
      width: var(--space-s);
      height: var(--space-s);
      border-radius: 50%;
      background: var(--color-primary);
      transform: scale(1);
      animation: pulse 1.5s infinite;
      top: 2px;
    }

    &__search {
      width: 300px;
    }

    @include w-max($sm) {
      &__name {
        font-size: var(--font-size-s);
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      background: var(--color-primary);
    }

    50% {
      transform: scale(1);
      background: var(--color-primary);
      filter: brightness(150%);
    }

    100% {
      transform: scale(0.95);
      background: var(--color-primary);
    }
  }

  .icon-active {
    height: var(--space-xl);
    width: var(--space-xl);
    cursor: pointer;
  }

  .full-width {
    width: 100%;
  }

  .scrollButton-enter-active,
  .scrollButton-leave-active {
    transition: opacity 0.3s ease;
  }

  .scrollButton-enter-from,
  .scrollButton-leave-to {
    opacity: 0;
  }
</style>
