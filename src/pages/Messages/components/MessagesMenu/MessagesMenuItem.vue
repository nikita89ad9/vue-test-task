<template>
  <BaseMenuItem>
    <UserBadge
      avatarSize="30"
      :avatarSrc="user.avatar?.mediaUrl"
    >
      <div class="user">
        <div
          v-if="isNameAvailable"
          class="user-data"
        >
          <p class="user-data_name">
            {{ userNameCut }}
          </p>
          <p class="user-data_email">
            {{ userMailCut }}
          </p>
        </div>
        <p
          v-else
          class="user-mail"
        >
          {{ userMailCut }}
        </p>
      </div>
    </UserBadge>
  </BaseMenuItem>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import BaseMenuItem from '@common/BaseMenu/BaseMenuItem/BaseMenuItem.vue';
  import type { IUser } from '@/stores/admin/usersStore/model';

  const props = defineProps<{
    user: IUser;
  }>();

  const isNameAvailable = computed(() => Boolean(props.user.name));

  const userName = computed<string>(() => {
    const { name, surname, email } = props.user;

    if (isNameAvailable.value) {
      const fullName = surname ? `${name} ${surname}` : name;
      return fullName || email;
    }

    return email;
  });

  const truncateText = (text: string) => {
    return text.length > 30 ? text.substring(0, 28) + '...' : text;
  };

  const userNameCut = computed(() => truncateText(userName.value));
  const userMailCut = computed(() => truncateText(props.user.email));
</script>

<style scoped lang="scss">
  .user {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    width: 100%;

    &-data {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);

      &_name {
        font-size: var(--font-size-s);
      }

      &_email {
        font-size: var(--font-size-2xs);
      }
    }
  }
</style>
