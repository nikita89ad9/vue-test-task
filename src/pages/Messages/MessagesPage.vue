<template>
  <div class="messages">
    <!-- удалить v-if -->
    <MessagesSidebar
      v-if="dialogsList.dialogs"
      :chats="dialogsList.dialogs"
      @chooseChat="chooseChat"
    />
    <MessagesChat
      v-if="chatVisibility"
      :dialogMessages="currentDialogMessages"
      :dialogData="currentDialogData"
      @messagesClose="closeChat"
    />
    <div
      v-else
      class="messages__placeholder"
    >
      {{ $t('messages.start') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

  import { useMessagesStore } from '@/stores/messagesStore/store';
  import { useWebSocketsStore } from '@/stores/websocketsStore/store';
  import MessagesChat from './components/MessagesChat.vue';
  import MessagesSidebar from './components/MessagesSidebar.vue';

  const { connectSocket, disconnectSocket } = useWebSocketsStore();
  const { listenWSSDialogEmits, getDialogsList, getDialogData } = useMessagesStore();

  const { dialogsList, currentDialogData, currentDialogMessages, isMessageSendPending } =
    storeToRefs(useMessagesStore());

  const chatVisibility = ref<boolean>(false);

  const chooseChat = (chatId: string) => {
    if (!isMessageSendPending.value) {
      getDialogData(chatId);
      chatVisibility.value = true;
    }
  };

  const closeChat = () => {
    chatVisibility.value = false;
  };

  onBeforeMount(() => {
    connectSocket();
    listenWSSDialogEmits();
    getDialogsList(0);
  });

  onBeforeUnmount(() => {
    disconnectSocket();
  });
</script>

<style scoped lang="scss">
  .messages {
    height: calc(100vh - 80px - var(--space-3xl) * 2);
    display: flex;
    border-radius: var(--space-border-s);
    box-shadow: var(--widget-shadow);
    overflow: hidden;

    &__placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: var(--color-font-secondary);
      font-size: var(--font-size-l);

      @include w-max($lg) {
        font-size: var(--font-size-s);
      }
    }

    @include w-max($lg) {
      position: relative;
    }

    @include w-max($sm) {
      height: calc(100vh - 80px - var(--space-s) * 2);
    }
  }
</style>
