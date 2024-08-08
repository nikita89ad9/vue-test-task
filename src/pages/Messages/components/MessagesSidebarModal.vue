<template>
  <BaseDropdown
    :closeOnClick="false"
    class="dropdown_right messages-dropdown"
  >
    <template #trigger>
      <IconWrapper
        :icon="icons.plusIcon"
        class="create-chat"
        :title="$t(`messages.createChat`)"
      />
    </template>
    <template #content>
      <div class="messages-modal">
        <div class="messages-modal__header">
          <BaseInput
            :placeholder="placeholder"
            class="messages-modal__search"
            :modelValue="inputData"
            @update:modelValue="searchForUsers"
          >
            <template #prepend-icon>
              <IconWrapper
                :icon="icons.search"
                regular
              />
            </template>
          </BaseInput>
        </div>
        <div
          v-if="messengerUsersList"
          class="messages-modal__list"
        >
          <MessagesMenu
            :usersList="messengerUsersList"
            @pickUser="startDialog"
          />
        </div>
        <div class="messages-modal__footer">
          <BaseButton>{{ $t(`messages.startChat`) }}</BaseButton>
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useDebounceFn } from '@vueuse/core';
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useMessagesStore } from '@/stores/messagesStore/store';
  import { icons } from '@/utils/icons';
  import MessagesMenu from './MessagesMenu/MessagesMenu.vue';

  const { t } = useI18n();
  const { startNewDialog, getMessengerUsersList } = useMessagesStore();

  const { messengerUsersList } = storeToRefs(useMessagesStore());

  const placeholder = computed<string>(() => t('messages.searchUsers'));

  const inputData = ref<string>('');

  const startDialog = (companionId: string) => {
    startNewDialog(companionId);
  };

  const searchForUsers = useDebounceFn((searchData: string) => {
    inputData.value = searchData;
    getMessengerUsersList(searchData, 1);
  }, 1000);

  onMounted(async () => {
    await getMessengerUsersList('', 1);
  });
</script>

<style lang="scss">
  .messages-dropdown {
    z-index: 999;
  }
</style>

<style scoped lang="scss">
  .messages-modal {
    position: relative;
    overflow: hidden;
    border-radius: var(--space-border-s);
    box-shadow: var(--widget-shadow);
    height: clamp(200px, 400px, 500px);
    width: clamp(150px, 250px, 344px);
    z-index: 999;

    &__search {
      width: 100%;
    }

    &__list {
      margin-top: 80px;
      width: 100%;
      height: 240px;
      overflow-y: auto;
    }

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      width: 100%;
      padding: var(--space-xl);
      background: var(--color-background-secondary);
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 1px solid var(--color-background-third);
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 80px;
      width: 100%;
      padding: var(--space-xl);
      background: var(--color-background-secondary);
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid var(--color-background-third);
    }
  }

  .create-chat {
    height: var(--space-xl);
    width: var(--space-xl);
    cursor: pointer;

    :deep(path) {
      fill: var(--color-font-secondary);
    }
  }
</style>
