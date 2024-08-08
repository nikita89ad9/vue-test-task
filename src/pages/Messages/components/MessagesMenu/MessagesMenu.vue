<template>
  <BaseMenu class="menu">
    <MessagesMenuItem
      v-for="item in usersList"
      :key="item.id"
      :user="item"
      class="menu-item"
      @click="emits('pickUser', item.id)"
    />
  </BaseMenu>
</template>

<script setup lang="ts">
  import BaseMenu from '@common/BaseMenu/BaseMenu/BaseMenu.vue';
  import type { IUser } from '@stores/admin/usersStore/model';
  import MessagesMenuItem from './MessagesMenuItem.vue';

  defineProps<{
    usersList: IUser[];
  }>();

  const emits = defineEmits<{
    pickUser: [userId: string];
  }>();
</script>

<style scoped lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    width: 100%;

    &-item {
      padding: var(--space-s);

      &:hover {
        background: var(--color-background-secondary);
      }
    }
  }
</style>
