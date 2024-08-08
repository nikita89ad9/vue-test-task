<template>
  <div
    class="topic"
    @click="handleTopicClick"
  >
    <div class="topic__logo">
      <img
        :src="topicLogoUrl"
        @error="e => setAltImg(e, '/section-placeholder.jpg')"
      />
    </div>
    <div class="topic__content">
      <div class="topic__content_top">
        <div class="topic__content__header">
          <div class="topic__content__header--name">{{ section.name }}</div>
          <div class="topic__content__header--info">
            <p>{{ $t('general.articles') }}: 23</p>
            <p>{{ $t('general.subscribers') }}: 23</p>
          </div>
        </div>
        <div class="topic__content__description">
          {{ section.description }}
        </div>
      </div>
      <div class="topic__content__badges">
        <Tile
          v-for="tile in popularTags"
          :key="tile"
          class="topic__content__badges__item"
        >
          {{ tile }}
        </Tile>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DOMAIN } from '@env/env.d.ts';

  import { computed } from 'vue';

  import Tile from '@/components/Tile/Tile.vue';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import { setAltImg } from '@/utils/setAltImage';

  const props = defineProps<{
    section: ISectionDTO;
  }>();

  const emit = defineEmits<(e: 'redirectToTarget', id: string) => void>();

  const topicLogoUrl = computed<string>(() =>
    props.section.preview
      ? `${DOMAIN}/${props.section.preview.mediaUrl}`
      : '/section-placeholder.jpg'
  );

  const handleTopicClick = () => {
    emit('redirectToTarget', props.section.id);
  };

  const popularTags = ['Javascript', 'React', 'Angular'];
</script>

<style scoped lang="scss">
  .topic {
    display: flex;
    flex-direction: row;
    gap: var(--space-l);
    padding: var(--space-xl);
    border: var(--border-light);
    border-radius: var(--space-border-s);
    transition: var(--transition-default);
    width: 100%;

    &:hover {
      cursor: pointer;
      border: 1px solid var(--color-primary);
    }

    &__logo {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-shrink: 0;
      width: 80px;
      height: 80px;

      :deep(img) {
        width: 100%;
        height: auto;
        display: block;
      }

      @include w-max($sm) {
        display: none;
      }
    }

    &__content {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;

      &__header {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xs);

        &--name {
          font-family: var(--font-manrope-semibold);
          font-size: var(--font-size-l);
          color: var(--color-font-primary);
        }

        &--info {
          font-family: var(--font-manrope-regular);
          font-size: var(--font-size-2xs);
          color: var(--color-font-secondary);
          display: flex;
          flex-direction: row;
          gap: var(--space-m);
          text-wrap: nowrap;

          @include w-max($sm) {
            display: none;
          }
        }
      }

      &__badges {
        font-size: var(--font-size-s);
        display: flex;
        align-items: start;
        justify-content: start;
        flex-wrap: row wrap;
        gap: var(--space-xs);
        margin-top: var(--space-xl);

        &__item {
          padding: var(--space-xs) var(--space-sm);
        }
      }

      &__description {
        font-size: var(--font-size-s);
        color: var(--color-font-secondary);
        line-height: 1.5;
      }
    }

    @include w-max($sm) {
      &__content {
        &__description {
          font-size: var(--font-size-xs);
        }
      }
    }
  }
</style>
