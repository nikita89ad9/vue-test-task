<template>
  <BaseLayout class="authors">
    <h3 class="authors__heading">
      {{ t('profile.subscribedToAuthors') }}
    </h3>
    <div class="authors__items">
      <UserBadge
        v-for="(item, index) in 10"
        :key="index"
        :avatarSize="avatarSize"
      >
        Name Surename
      </UserBadge>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UserBadge from '@components/UserBadge/UserBadge.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import { useDeviceStore } from '@/stores/deviceStore/store';

  const { t } = useI18n();
  const { isMobile } = storeToRefs(useDeviceStore());

  const avatarSize = computed<string>(() => (!isMobile.value ? '40' : '30'));
</script>

<style scoped lang="scss">
  .authors {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    align-items: flex-start;

    &__heading {
      font-size: var(--font-size-xm);
      color: var(--color-font-primary);
      width: 100%;

      @include w-max($md) {
        font-size: var(--font-size-s);
        text-align: center;
      }
    }

    &__items {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-s);

      @include w-max($md) {
        justify-items: center;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }
  }
</style>
