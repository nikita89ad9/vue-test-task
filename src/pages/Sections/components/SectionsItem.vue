<template>
  <div class="section">
    <div class="section__description">
      <div class="section__avatar">
        <BaseAvatar
          :src="imageUrl"
          @error="e => setAltImg(e, '/article-preview.png')"
        />
      </div>
      <div class="section__info section-info">
        <div class="section-info__heading">
          <div class="section-info__label">{{ item.name }}</div>
        </div>
        <div class="section-info__description">{{ item.description }}</div>
        <div class="section-info__tags section-tags">
          <Tile
            v-for="tile in item.sectionStats?.popularTags"
            :key="tile"
            class="section-tags__item"
          >
            {{ tile }}
          </Tile>
        </div>
      </div>
    </div>
    <div class="section__metrics section-metrics">
      <div class="section-metrics__item">
        {{ item.sectionStats?.articlesCount }}
      </div>
      <div class="section-metrics__item">
        {{ item.sectionStats?.articlesCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseAvatar from '@/components/common/BaseAvatar/BaseAvatar.vue';
  import Tile from '@/components/Tile/Tile.vue';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import { getFilePath } from '@/utils/getFilePath';
  import { setAltImg } from '@/utils/setAltImage';

  const props = defineProps<{
    item: ISectionDTO;
  }>();

  const imageUrl = computed(() => {
    return getFilePath(props.item.preview?.mediaUrl);
  });
</script>

<style scoped lang="scss">
  .section {
    background-color: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    border-radius: var(--space-border-s);
    padding: var(--space-xl);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-2xl);

    &__description {
      display: flex;
      gap: var(--space-l);
    }

    &__avatar {
      :deep(img) {
        height: 110px;
        width: 110px;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      align-items: start;
      width: 100%;

      &__heading {
        display: flex;
        align-items: start;
        justify-content: space-between;
        width: 100%;
        margin-bottom: var(--space-xs);
        color: var(--color-font-primary);
      }

      &__label {
        font-size: var(--font-size-xl);

        @include w-max($lg) {
          font-size: var(--font-size-m);
        }
      }

      &__description {
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);
        font-family: var(--font-manrope-regular);
        margin-bottom: var(--space-l);
        line-height: 1.5;

        @include w-max($lg) {
          font-size: var(--font-size-xs);
        }
      }

      &__tags {
        display: flex;
        flex-flow: row wrap;
        gap: var(--space-xs);
      }
    }

    &-metrics {
      display: flex;
      gap: var(--space-xl);

      &__item {
        display: flex;
        width: 115px;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);

        &__icon {
          display: none;
        }
      }
    }

    @include w-max($xl) {
      &__avatar {
        :deep(img) {
          height: 90px;
          width: 90px;
        }
      }

      &-info {
        &__tags {
          display: flex;
          gap: var(--space-xs);
        }
      }
    }

    @include w-max($lg) {
      &__avatar {
        :deep(img) {
          height: 60px;
          width: 60px;
        }
      }

      &__description {
        display: flex;
        gap: var(--space-m);
      }
    }

    @include w-max($md) {
      display: flex;
      flex-direction: column;
      padding: var(--space-s);
      gap: var(--space-l);

      &__avatar {
        :deep(img) {
          height: 40px;
          width: 40px;
        }
      }

      &__info {
        &__heading {
          font-size: var(--font-size-m);
        }

        &__description {
          font-size: var(--font-size-xs);
        }
      }

      &-metrics {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: var(--space-s);

        &__item {
          width: auto;
          gap: var(--space-2xs);
        }

        &__icon {
          display: block;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
</style>
