<template>
  <BaseLayout class="sections">
    <h3 class="sections__heading">
      {{ t('profile.subscribedToSections') }}
    </h3>
    <div class="sections__tiles">
      <ProfileSectionsItem
        v-for="item in subscribedSections"
        :key="item"
        :item="item"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import ProfileSectionsItem from './ProfileSectionsItem.vue';

  const { t } = useI18n();

  const subscribedSections = ['Vue', 'React', 'How to basic', 'Among us'];
</script>

<style scoped lang="scss">
  .sections {
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

    &__tiles {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-s);
    }
  }
</style>
