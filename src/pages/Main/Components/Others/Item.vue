<template>
  <div
    class="article"
    @click="handleItemClick"
  >
    <div class="article__bg">
      <img
        :src="itemImageURL"
        @error="e => setAltImg(e, fallbackURL)"
      />
    </div>
    <div class="article__info-section">
      <div class="article__top">
        <div class="article__category">Javascript</div>
        |
        <Date
          class="article__date"
          :utcDate="item.createdAt"
        />
      </div>

      <div class="article__info-section__header">
        <h2>{{ stringCutter(item.title, 55) }}</h2>
        <span class="article__info-section__author"> by {{ item.author }} </span>
      </div>
      <div class="article__info-section__tiles">
        <Tile
          v-for="tile in item.tags.slice(0, 2)"
          :key="tile.id"
          class="article__info-section__tile__item"
          >{{ tile.name }}</Tile
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DOMAIN } from '@env/env.d.ts';

  import { computed } from 'vue';

  import Date from '@/components/Date/Date.vue';
  import Tile from '@/components/Tile/Tile.vue';
  import { setAltImg } from '@/utils/setAltImage';
  import { stringCutter } from '../../helpers';
  import type { IItem } from '../../types';

  const props = defineProps<{ item: IItem }>();

  const emit = defineEmits<(e: 'redirectToTarget', id: string) => void>();

  const itemImageURL = computed<string>(() =>
    props.item.image
      ? `${DOMAIN}/${props.item.image}`
      : 'src/assets/images/main-item-placeholder.jpg'
  );

  const fallbackURL = 'src/assets/images/main-item-placeholder.jpg';

  const handleItemClick = () => {
    emit('redirectToTarget', props.item.id);
  };
</script>

<style scoped lang="scss">
  .article {
    display: flex;
    flex-direction: column;
    justify-content: end;
    min-width: 200px;
    min-height: 280px;
    height: 100%;
    width: 100%;
    position: relative;
    cursor: pointer;
    padding: var(--space-xl);

    &:hover {
      :deep(img) {
        scale: 1.02;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-black-overlay);
      z-index: 1;
    }

    &__top {
      position: absolute;
      right: var(--space-xl);
      top: var(--space-xl);
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      color: var(--color-font-light);

      @include w-max($md) {
        right: var(--space-m);
        top: var(--space-m);
      }
    }

    &__category {
      background: #999;
      color: var(--color-font-light);
      padding: var(--space-xs) var(--space-s);
      font-size: var(--font-size-2xs);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-family: var(--font-inter-regular);
    }

    &__date {
      color: var(--color-font-light);
      font-size: var(--font-size-2xs);
      text-wrap: nowrap;
    }

    &__bg {
      content: '';
      background-color: var(--color-background-icon);
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        transition: var(--transition-default);
        cursor: pointer;
        object-fit: cover;
      }
    }

    &__info-section {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: var(--space-m);
      z-index: 3;

      &__tile {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
      }

      &__tiles {
        display: flex;
        gap: var(--space-2xs);
      }

      &__header {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);

        h2 {
          color: var(--color-font-light);
          letter-spacing: 0.3px;
          line-height: 1.5;
        }
      }

      &__author {
        font-family: var(--font-manrope-medium);
        font-size: var(--font-size-2xs);
        color: var(--color-font-light);
      }
    }

    @include w-max($md) {
      min-width: 100px;
      min-height: 180px;
      padding: var(--space-m);
    }

    @include w-max($sm) {
      min-width: 60px;
    }
  }
</style>
