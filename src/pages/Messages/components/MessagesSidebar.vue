<template>
  <div
    ref="sidebar"
    class="messages-sidebar"
    :class="isOpen ? 'messages-sidebar_open' : ''"
  >
    <div class="messages-sidebar__controls">
      <div
        class="messages-sidebar__placeholder"
        :title="$t('messages.openMenu')"
        @click="toggleMenu(true)"
      >
        <IconWrapper
          class="placeholder-icon"
          :icon="icons.chatRectangle"
        />
      </div>
      <div class="messages-sidebar__header">
        <h3 class="messages-sidebar__title">{{ $t(`messages.title`) }}</h3>
        <MessagesSidebarModal
          class="messages-sidebar__modal"
          :chats="chats"
        />
      </div>
      <BaseInput
        class="messages-sidebar__search"
        :placeholder="placeholder"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            :title="$t(`messages.search`)"
            regular
          />
        </template>
      </BaseInput>
    </div>
    <div
      ref="scrollableList"
      class="messages-sidebar__list messages-list"
      :class="{ 'messages-list_scrollable': scrollY > 0 }"
    >
      <MessagesSidebarItem
        v-for="item in chats"
        :key="item.id"
        :item="item"
        @click="emits('chooseChat', item.id)"
        @deleteChat="deleteDialog(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useScroll } from '@vueuse/core';
  import { onClickOutside } from '@vueuse/core';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useMessagesStore } from '@/stores/messagesStore/store';
  import type { IDialogCreateDTOResp } from '@/services/dialogs/dialogs.types';
  import { icons } from '@/utils/icons';
  import MessagesSidebarItem from './MessagesSidebarItem.vue';
  import MessagesSidebarModal from './MessagesSidebarModal.vue';

  defineProps<{
    chats: IDialogCreateDTOResp[];
  }>();

  const emits = defineEmits<{
    chooseChat: [chatId: string];
  }>();

  const { t } = useI18n();
  const { deleteDialog } = useMessagesStore();

  const placeholder = computed<string>(() => t('messages.search'));

  const scrollableList = ref<HTMLElement | null>(null);
  const sidebar = ref<HTMLElement | null>(null);

  const { y: scrollY } = useScroll(scrollableList);

  const isOpen = ref(false);

  const toggleMenu = (value = !isOpen.value) => {
    isOpen.value = value;
  };

  onClickOutside(sidebar, () => {
    toggleMenu(false);
  });
</script>

<style lang="scss">
  .messages-sidebar.messages-sidebar_open {
    @include w-max($lg) {
      .message-card {
        width: 100%;

        .message-card__counter,
        .message-card__dropdown-wrap {
          display: flex;
        }

        .message-card__content {
          display: block;
        }
      }
    }

    @include w-max($sm) {
      .message-card {
        padding: var(--space-s);
      }
    }
  }
</style>

<style scoped lang="scss">
  .messages-list {
    height: 100%;
    width: 344px;
    scrollbar-gutter: stable;
    transition: var(--transition-even);
    background-color: var(--color-background-secondary);
    overflow-y: hidden;

    &:hover {
      overflow-y: auto;
    }

    &_scrollable {
      position: relative;
    }
  }

  .messages-sidebar {
    display: flex;
    flex-direction: column;
    min-width: 344px;
    max-width: 344px;
    height: 100%;
    transition: var(--transition-even);
    overflow: hidden;

    &__list {
      flex: 1;
    }

    &__controls {
      padding: var(--space-3xl) var(--space-xl);
      background-color: var(--color-background-secondary);
      gap: var(--space-xl);
    }

    &__placeholder {
      width: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      padding: var(--space-2xs) 0;
      cursor: pointer;

      .placeholder-icon {
        width: var(--space-3xl);
        height: var(--space-3xl);

        :deep(path) {
          fill: var(--color-font-secondary);
        }
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: var(--space-xl);
    }

    &__title {
      color: var(--color-font-secondary);
      font-size: var(--font-size-xm);
    }

    &__search {
      height: 40px;
    }

    @include w-max($lg) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      min-width: 94px;

      &__list {
        width: 94px;
      }

      &__placeholder {
        display: flex;
      }

      .messages-sidebar__controls {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
      }

      &__header {
        margin: 0;
        width: auto;
      }

      &__title,
      &__header,
      .input {
        transition: var(--transition-even);
        display: none;
      }
    }

    @include w-max($sm) {
      min-width: 50px;

      &__controls {
        padding: var(--space-xl) var(--space-xs);
        display: flex;
        justify-content: center;
      }

      &__list {
        width: 50px;
      }
    }
  }

  .messages-sidebar.messages-sidebar_open {
    @include w-max($lg) {
      width: 344px;

      .messages-sidebar__list {
        width: 344px;
      }

      .messages-sidebar__placeholder {
        display: none;
      }

      .messages-sidebar__header,
      .input {
        display: flex;
      }

      .messages-sidebar__header {
        align-items: center;
      }
    }

    @include w-max($sm) {
      width: 280px;

      .messages-sidebar__controls {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
      }

      .messages-sidebar__list {
        width: 280px;
      }
    }
  }

  .create-chat {
    height: var(--space-xl);
    width: var(--space-xl);
    cursor: pointer;
  }
</style>
