<template>
  <BaseDropdown :closeOnClick="false">
    <template #trigger>
      <button
        class="trigger"
        :title="$t('notifications.title')"
      >
        <IconWrapper
          class="trigger__icon"
          :icon="icons.bell"
        />
        <span class="trigger__counter">2</span>
      </button>
    </template>
    <template #content="{ close }">
      <div class="notifications">
        <div class="notifications__header">
          <h4 class="notifications__title">{{ $t('notifications.title') }}</h4>
          <p class="notifications__subheader">
            <span>{{ $t('notifications.markAsRead') }}</span>
          </p>
        </div>
        <div class="notifications__tabs notifications-tabs">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="[
              'notifications-tabs__item',
              { 'notifications-tabs__item_active': item.name === selectedTab.name },
            ]"
            @click="selectTab(item)"
          >
            {{ item.label }}
          </span>
        </div>
        <div
          v-if="notifications.length"
          class="notifications__list notifications-list"
        >
          <DynamicScroller
            #default="{ item }"
            :items="notifications"
            :minItemSize="96"
            class="scroller"
          >
            <DynamicScrollerItem
              active
              :item="item"
              :sizeDependencies="[item.message]"
              :data-index="item.id"
            >
              <HeaderNotificationsItem
                :key="item.id"
                :item="item"
                @redirectToItem="(id: string) => redirectToArticle(id, close)"
              />
            </DynamicScrollerItem>
          </DynamicScroller>
        </div>
        <div
          v-else
          class="notifications__placeholder"
        >
          {{ $t('notifications.noItems') }}
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import router from '@/router';
  import { notifications } from './data';
  import HeaderNotificationsItem from './HeaderNotificationsItem.vue';

  const { t } = useI18n();

  const tabs = computed(() => [
    { name: 'Notifications', label: t('notifications.title') },
    { name: 'Comments', label: t('notifications.comments') },
  ]);

  const selectedTab = ref({ name: 'Notifications', label: t('notifications.title') });

  const selectTab = (tab: { name: string; label: string }) => {
    if (tab.name !== selectedTab.value.name) {
      selectedTab.value = tab;
    }
  };

  const redirectToArticle = (articleID: string, callback: () => void) => {
    router.push({ name: 'Article', params: { articleID } });
    callback();
  };
</script>

<style scoped lang="scss">
  .trigger {
    background: none;
    cursor: pointer;
    position: relative;

    &__icon {
      :deep(path) {
        fill: var(--color-font-primary);
      }
    }

    &__counter {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -25%;
      left: 50%;
      min-width: var(--space-l);
      min-height: var(--space-l);
      padding: var(--space-2xs);
      border-radius: 50%;
      background: var(--color-primary);
      color: var(--color-font-light);
    }
  }

  .notifications {
    width: 500px;
    box-shadow: var(--shadow-widget);

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-s) var(--space-xl);
      border-bottom: var(--border-light);
    }

    &__subheader {
      display: flex;
      justify-content: flex-end;

      span {
        font-size: var(--font-size-xs);
        color: var(--color-font-secondary);
        cursor: pointer;
      }
    }

    &__title {
      font-size: var(--font-size-l);
    }

    &__placeholder {
      padding: var(--space-xl);
      font-size: var(--font-size-s);
    }

    &-list {
      width: 100%;
      height: 372px;
      overflow-y: auto;
    }

    &-tabs {
      display: flex;
      flex-direction: row;
      padding: var(--space-s) var(--space-xl);
      gap: var(--space-s);

      &__item {
        font-size: var(--font-size-xs);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        padding: var(--space-2xs) 0;
        color: var(--color-font-secondary);

        &_active {
          border-bottom: 2px solid var(--color-primary);
          color: var(--color-primary);
        }
      }
    }

    @include w-max($md) {
      width: 340px;
    }
  }

  .scroller {
    height: 100%;
  }
</style>
