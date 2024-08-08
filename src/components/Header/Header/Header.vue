<template>
  <header class="header">
    <div class="header-icons">
      <IconWrapper
        v-if="isMobile"
        :icon="icons.burger"
        class="header-icons__burger"
        @click="toggleSidebarState"
      />
      <IconWrapper
        class="header-icons__logo"
        :icon="icons.innoLogo"
        @click="router.push({ name: 'Main' })"
      />
    </div>
    <div class="header__user-info__wrapper">
      <BaseButton
        class="header__user-info__wrapper-trans"
        @click="router.push({ name: 'Editor' })"
      >
        <IconWrapper
          class="header__add-icon"
          :icon="icons.plusIcon"
        />
        <span
          v-if="isDesktop"
          class="header__add-text"
        >
          {{ $t('general.newArticle') }}
        </span>
      </BaseButton>
      <ToggleSwitch
        :modelValue="themeState"
        @update:modelValue="switchTheme"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.sun"
            class="icon"
          />
        </template>
        <template #append-icon>
          <IconWrapper
            :icon="icons.moon"
            class="icon"
          />
        </template>
      </ToggleSwitch>
      <BaseButton
        v-if="!isTablet && !isMobile"
        class="header__user-info__wrapper-trans"
        @click="switchLang"
      >
        {{ locale.lang.toUpperCase() }}
      </BaseButton>
      <HeaderNotifications />
      <HeaderMenu>
        <template #trigger>
          <UserBadge
            class="header__user-info__wrapper-badge"
            :avatarSrc="avatarUrl"
          >
            <div
              v-if="!isTablet && !isMobile"
              class="header__user-info"
            >
              <p class="header__user-info__name">
                {{ userName }}
                {{ userSurename }}
              </p>
              <p class="header__user-info__department">{{ userDepartment }}</p>
            </div>
          </UserBadge>
        </template>
        <template
          v-if="isTablet"
          #mobile
        >
          <div class="header__user-info header-menu__mobile">
            <p class="header__user-info__name">
              {{ userName }}
              {{ userSurename }}
            </p>
            <p class="header__user-info__department">{{ userDepartment }}</p>
            <div class="header-menu__mobile-state">
              <BaseButton
                v-if="isTablet"
                class="header__user-info__wrapper-trans"
                @click.stop="switchLang"
              >
                {{ locale.lang.toUpperCase() }}
              </BaseButton>
            </div>
          </div>
        </template>
      </HeaderMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';

  import HeaderMenu from '@components/Header/HeaderMenu/HeaderMenu.vue';
  import IconWrapper from '@components/IconWrapper.vue';
  import ToggleSwitch from '@components/ToggleSwitch/ToggleSwitch.vue';
  import UserBadge from '@components/UserBadge/UserBadge.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import { useSidebarStore } from '@stores/sidebarStore/store';
  import { useUserStore } from '@stores/userStore/store';
  import { useDeviceStore } from '@/stores/deviceStore/store';
  import { useLocaleStore } from '@/stores/localeStore';
  import { useThemeStore } from '@/stores/themeStore/store';
  import { icons } from '@utils/icons';
  import { getFilePath } from '@/utils/getFilePath';
  import router from '@/router';
  import HeaderNotifications from '../HeaderNotifications/HeaderNotifications.vue';

  const locale = useLocaleStore();
  const { theme } = storeToRefs(useThemeStore());
  const { user } = storeToRefs(useUserStore());
  const { isMobile, isTablet, isDesktop } = storeToRefs(useDeviceStore());
  const { setTheme } = useThemeStore();
  const { toggleSidebarState } = useSidebarStore();

  const themeState = computed<boolean>(() => theme.value === 'dark');

  const switchLang = () => {
    if (locale.lang === 'en') locale.setLang('ru');
    else locale.setLang('en');
  };

  const switchTheme = () => {
    if (themeState.value) {
      setTheme('light');
    } else setTheme('dark');
  };

  const userName = computed(() => user.value?.name || user.value?.email);
  const userSurename = computed(() => (user.value?.name && user.value.surname) || null);

  const userDepartment = computed(() => {
    if (user.value?.department) {
      return user.value.department;
    }
    return 'Free bird';
  });

  const avatarUrl = computed(() => {
    if (user.value && user.value.avatar) {
      if (user.value.avatar.mediaUrl) {
        return getFilePath(user.value.avatar.mediaUrl);
      } else {
        return null;
      }
    }
    return '/avatarSample.png';
  });
</script>

<style scoped lang="scss">
  .header {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-s) var(--space-xl);
    position: sticky;
    top: 0;
    left: 0;
    background: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    height: var(--header-height);
    z-index: 4;

    &-icons {
      display: flex;
      align-items: flex-end;
      gap: var(--space-m);

      &__burger {
        cursor: pointer;
      }

      &__logo {
        cursor: pointer;
        width: 200px;
        height: 29px;
        margin-right: var(--space-m);

        &::v-deep(path):nth-child(2) {
          fill: var(--color-fill);
        }

        @include w-max($sm) {
          width: 150px;
        }
      }
    }

    &__user-info__wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-l);

      &-trans {
        padding: var(--space-xs) var(--space-s);
        border-radius: var(--space-border-xs);
      }

      &-badge {
        cursor: pointer;
        gap: var(--space-l);
      }
    }

    &__user-info {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      &__name {
        font-size: var(--font-size-xm);
        color: var(--color-font-primary);
        font-weight: 600;
      }

      &__department {
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);
      }
    }

    &-menu__mobile {
      padding: var(--space-s) var(--space-l);

      &-state {
        display: flex;
        align-items: center;
        gap: var(--space-m);
      }
    }

    &__add-icon {
      width: var(--space-m);
      height: var(--space-m);

      :deep(path) {
        fill: #fff;
      }
    }

    &__add-text {
      padding-left: var(--space-xs);
    }
  }

  .icon {
    :deep(path) {
      fill: var(--color-font-light);
    }
  }
</style>
