<template>
  <div class="item">
    <div class="item__content">
      <div
        ref="image"
        class="item__logo"
      >
        <img
          src="/article-preview.png"
          alt="Meetup Prev"
        />
      </div>
      <div class="item__info">
        <div class="item__info__header">
          <div class="item__info__header__title">{{ meetup.title }}</div>
          <Date
            :utcDate="meetup.createdAt"
            class="item__info__header__time"
          />
        </div>
        <div class="item__info__description">
          {{ stringCutter(meetup.description, descriptionSymbols) }}
        </div>
      </div>
    </div>
    <div class="item__footer">
      <div class="item__footer--left">
        <div class="item__footer__participants">
          <IconWrapper :icon="icons.multiperson" />{{ meetup.participants }}
        </div>
      </div>
      <div class="item__footer__tags">
        <Tile
          v-for="tag in meetup.tags"
          :key="tag.id"
          class="item__footer__tags__item"
        >
          {{ tag.name }}
        </Tile>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useElementSize } from '@vueuse/core';
  import { computed, ref } from 'vue';

  import { stringCutter } from '@/pages/Main/helpers';
  import Date from '@/components/Date/Date.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import Tile from '@/components/Tile/Tile.vue';
  import type { IMeetupDTO } from '@/services/meetups/meetups.types';
  import { icons } from '@/utils/icons';

  defineProps<{
    meetup: IMeetupDTO;
  }>();

  const image = ref(null);

  const { width } = useElementSize(image);

  const computedHeight = computed(() => (width.value / 16) * 9 + 'px');

  const descriptionSymbols = computed<number>(() => window.innerWidth * 0.2);
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--color-background-primary);
    padding: var(--space-xl);
    box-shadow: var(--shadow-widget);
    border-radius: var(--space-border-s);
    transition: var(--transition-default);
    max-width: 100%;
    gap: var(--space-m);

    &__content {
      display: flex;
      gap: var(--space-m);
    }

    &__logo {
      display: block;
      min-width: 213px;
      height: 120px;
      overflow: hidden;
      border-radius: var(--space-border-s);

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:hover {
      cursor: pointer;
    }

    &__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;

      &__header {
        display: flex;
        flex: 0 0 10px;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-m);

        &__title {
          display: flex;
          align-self: flex-start;
          font-family: var(--font-manrope-semibold);
          color: var(--color-font-primary);
          font-size: var(--font-size-xm);
          margin-right: var(--space-s);

          @include w-max($lg) {
            font-size: var(--font-size-xl);
          }
        }

        &__time {
          display: flex;
          align-self: flex-start;
          flex-shrink: 0;
          font-family: var(--font-manrope-regular);
          color: var(--color-font-secondary);
          font-size: var(--font-size-s);
        }
      }

      &__description {
        font-family: var(--font-manrope-regular);
        color: var(--color-font-secondary);
        font-size: var(--font-size-s);
        margin-bottom: var(--space-l);
        text-align: justify;
        line-height: 1.5;
      }
    }

    &__footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2xl);

      &--left {
        display: flex;
        gap: var(--space-m);
      }

      &__duration {
        font-family: var(--font-manrope-regular);
        color: var(--color-font-secondary);
        font-size: var(--font-size-s);

        :deep(path) {
          fill: var(--color-font-primary);
        }
      }

      &__participants {
        font-family: var(--font-manrope-regular);
        color: var(--color-font-secondary);
        font-size: var(--font-size-s);

        :deep(path) {
          fill: var(--color-font-primary);
        }
      }

      &__duration,
      &__participants {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--space-2xs);
        font-size: var(--font-size-xs);

        .icon-wrapper {
          width: var(--space-m);
          height: var(--space-m);
        }
      }

      &__tags {
        display: flex;
        flex-direction: row;
        gap: var(--space-xs);

        &__item {
          @include w-max($sm) {
            padding: var(--space-2xs) var(--space-xs);
            font-size: var(--font-size-2xs);
          }
        }
      }
    }

    @include w-max($md) {
      gap: 0;

      &__content {
        flex-direction: column;
      }

      &__info {
        &__header {
          &__title {
            font-size: var(--font-size-m);
          }

          &__time {
            font-size: var(--font-size-xs);
          }
        }

        &__description {
          font-size: var(--font-size-xs);
        }
      }

      &__logo {
        height: v-bind(computedHeight);
      }

      &__footer {
        &__duration {
          font-size: var(--font-size-xs);
          gap: var(--space-2xs);
        }

        &__participants {
          font-size: var(--font-size-xs);
          gap: var(--space-2xs);
        }

        .icon-wrapper {
          width: var(--space-m);
          height: var(--space-m);

          :deep(svg) {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    @include w-max($sm) {
      &__footer {
        flex-direction: column-reverse;
        align-items: flex-end;

        &--left {
          display: none;
        }
      }

      &__info {
        &__header {
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-2xs);

          &__time {
            align-self: flex-end;
          }
        }
      }
    }

    @include w-max($xs) {
      &__content {
        gap: var(--font-size-2xs);
      }

      &__info {
        &__header {
          flex-direction: column;
          align-items: flex-end;

          &__title {
            margin-bottom: var(--space-2xs);
            margin-right: 0;
          }

          &__time {
            display: flex;
            font-size: var(--font-size-2xs);
          }
        }
      }
    }
  }
</style>
