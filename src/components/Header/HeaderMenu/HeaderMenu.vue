<template>
  <BaseDropdown class="dropdown_bottom dropdown_right">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template #content>
      <slot name="mobile" />
      <BaseMenu>
        <HeaderMenuItem
          v-for="item in menuItems"
          :key="item.text"
          @click="
            [
              item.action ? item.action() : null,
              router.push({
                name: item.route,
                params: item.param ? { profileID: item.param } : undefined,
              }),
            ]
          "
        >
          <template #icon>
            <IconWrapper :icon="item.icon" />
          </template>
          <template #text> {{ item.text }} </template>
        </HeaderMenuItem>
      </BaseMenu>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import HeaderMenuItem from '@components/Header/HeaderMenuItem/HeaderMenuItem.vue';
  import IconWrapper from '@components/IconWrapper.vue';
  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseMenu from '@common/BaseMenu/BaseMenu/BaseMenu.vue';
  import { useAuthStore } from '@/stores/authStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import { icons } from '@/utils/icons';
  import router from '@/router';
  import type { HeaderMenu } from '../types';

  const { t } = useI18n();
  const { logOut } = useAuthStore();
  const { user } = storeToRefs(useUserStore());

  const menuItems = computed<HeaderMenu[]>(() => [
    {
      icon: icons.person,
      text: t('headerMenu.profile'),
      route: 'Profile',
      param: user.value?.id,
    },
    {
      icon: icons.document,
      text: t('headerMenu.sections'),
      route: 'Sections',
    },
    {
      icon: icons.wallet,
      text: t('headerMenu.becomeMember'),
      route: 'Subscriptions',
    },
    {
      icon: icons.settings,
      text: t('headerMenu.settings'),
      route: 'Settings',
    },
    {
      icon: icons.leave,
      text: t('headerMenu.signOut'),
      route: '',
      action: logOut,
    },
  ]);
</script>
