<template>
  <div class="mentions">
    <div class="mentions__header">
      <h6 class="mentions__title">People</h6>
      <BaseInput
        v-model="search"
        :placeholder="$t(`messages.searchUsers`)"
        class="mentions__search"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
      </BaseInput>
    </div>

    <template v-if="items.length">
      <button
        v-for="(item, index) in filteredItems"
        :key="index"
        class="mentions__item mentions-item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        <UserBadge
          avatarSize="32"
          :avatarSrc="item.avatar"
          class="mentions-item__content"
        >
          <div class="mentions-item__description">
            <p class="mentions-item__username">
              {{ item.username }}
            </p>
            <p class="mentions-item__email">{{ item.email }}</p>
          </div>
        </UserBadge>
      </button>
    </template>
    <div
      v-else
      class="mentions-list__placeholder"
    >
      No result
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  import { icons } from '@/utils/icons';
  import type { EditorMentionsItem } from '@/types/Editor';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import IconWrapper from '../IconWrapper.vue';
  import UserBadge from '../UserBadge/UserBadge.vue';

  const props = defineProps<{
    items: EditorMentionsItem[];
    command: ({ id }: { id: string }) => void;
  }>();

  const search = ref('');

  const selectedIndex = ref(0);

  const filteredItems = computed(() =>
    props.items.filter(
      item => item.username.includes(search.value) || item.email.includes(search.value)
    )
  );

  watch(props.items, () => {
    selectedIndex.value = 0;
  });

  const onKeyDown = (event: KeyboardEvent): boolean => {
    if (event.key === 'ArrowUp') {
      upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      enterHandler();
      return true;
    }

    return false;
  };

  const upHandler = (): void => {
    selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length;
  };

  const downHandler = (): void => {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
  };

  const enterHandler = (): void => {
    selectItem(selectedIndex.value);
  };

  const selectItem = (index: number): void => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item.username ?? item.email });
    }
  };

  defineExpose({ onKeyDown });
</script>

<style scoped lang="scss">
  .mentions {
    flex-shrink: 0;
    position: relative;
    border-radius: var(--space-border-s);
    background: var(--color-background-primary);
    color: var(--color-secondary);
    overflow-y: auto;
    font-size: var(--font-size-xs);
    box-shadow: var(--shadow-widget);
    max-height: 250px;
    max-width: 350px;
    min-width: 350px;
    width: 100%;

    &__title {
      display: flex;
      align-items: center;
      font-size: var(--font-size-xs);
      padding: var(--space-xs);
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    &__header {
      padding: var(--space-xs);
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      max-width: 350px;
      width: 100%;
    }

    &__search {
      :deep(.input__wrapper) {
        flex-wrap: nowrap;

        .input__field {
          font-size: var(--font-size-xs);
        }
      }
    }

    &-item {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin: 0;
      width: 100%;
      text-align: left;
      background: transparent;
      border-radius: 0;
      transition: var(--transition-even);
      height: 50px;
      padding-left: var(--space-xs);
      text-wrap: nowrap;

      &:hover {
        background-color: var(--color-font-third);
      }

      &.is-selected {
        background-color: var(--color-font-third);
      }

      &__content {
        display: flex;
        flex-flow: row nowrap;
      }

      &__description {
        gap: var(--space-2xs);
        flex-flow: column wrap;
      }

      &__username {
        font-size: var(--font-size-xs);
      }

      &__email {
        font-size: var(--font-size-2xs);
        color: var(--color-font-secondary);
      }
    }

    &__placeholder {
      max-width: 350px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
