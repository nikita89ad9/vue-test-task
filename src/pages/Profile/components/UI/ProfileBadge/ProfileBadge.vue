<template>
  <div class="badge">
    <IconWrapper
      class="badge-icon"
      :icon="item.icon"
    />
    <div class="badge-description">
      <span class="badge-description__heading">
        {{ item.heading + ':' }}
      </span>
      <span class="badge-description__text">
        {{ item.text || t('profile.badge.notYet') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import type { ProfileBadgeItem } from '@/pages/Profile/types';
  import IconWrapper from '@components/IconWrapper.vue';

  const { t } = useI18n();

  defineProps<{
    item: ProfileBadgeItem;
  }>();
</script>

<style scoped lang="scss">
  .badge {
    display: flex;
    align-items: flex-start;
    gap: var(--space-m);
    width: fit-content;

    &-icon {
      width: var(--space-2xl);
      height: var(--space-2xl);

      :deep(path) {
        fill: var(--color-font-secondary);
      }
    }

    &-description {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      &__heading {
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);

        @include w-max($sm) {
          font-size: var(--font-size-xs);
        }
      }

      &__text {
        font-size: var(--font-size-s);
        color: var(--color-font-primary);
        font-weight: 600;

        @include w-max($sm) {
          font-size: var(--font-size-xs);
        }
      }
    }
  }
</style>
