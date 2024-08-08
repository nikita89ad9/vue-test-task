<template>
  <BaseLayout class="topics">
    <h3 class="topics__heading">
      {{ t('profile.subscribedToTopics') }}
    </h3>
    <div class="topics__tiles">
      <Tile
        v-for="item in subscribtedTopics"
        :key="item"
        deletable
        class="tile"
      >
        {{ item }}
      </Tile>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import Tile from '@components/Tile/Tile.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';

  const { t } = useI18n();

  const subscribtedTopics = ['Vue', 'React', 'How to basic', 'Among us'];
</script>

<style scoped lang="scss">
  .topics {
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

      .tile {
        @include w-max($xs) {
          width: 100%;
          gap: auto;
          justify-content: space-between;
        }
      }
    }
  }
</style>
