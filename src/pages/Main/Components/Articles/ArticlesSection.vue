<template>
  <BaseLayout class="articles">
    <SectionHeader :header="articlesHeader" />
    <div class="articles__grid">
      <div
        v-for="(item, index) in itemsArr"
        :key="item.id"
        :class="{
          'articles__grid__item--2x2': index === 0,
          'articles__grid__item--2x1': index === 1,
          'articles__grid__item--1x1': index > 1,
        }"
      >
        <Item
          :item="item"
          class="custom-item"
          @redirectToTarget="redirectToTarget"
        ></Item>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import type { IArticleDTO } from '@/services/articles/articles.types';
  import router from '@/router';
  import Item from '../Others/Item.vue';
  import SectionHeader from '../SectionHeader.vue';

  const props = defineProps<{
    articles: IArticleDTO[];
  }>();

  const itemsArr = computed(() =>
    props.articles.map(article => {
      return {
        id: article.id,
        title: article.title,
        createdAt: article.createdAt,
        description: article.description,
        tags: article.tags,
        image: article.previewId,
        author: article.author.name
          ? `${article.author.name} ${article.author.surname}`
          : article.author.email,
      };
    })
  );

  const articlesHeader = {
    title: 'general.latestArticles',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    route: 'Articles',
  };

  const redirectToTarget = (id: string) => {
    router.push({ name: 'Article', params: { articleID: id } });
  };
</script>

<style scoped lang="scss">
  .articles {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: var(--space-3xl);
    background-color: var(--color-background-primary);

    &__header {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: var(--space-m);

      &--p {
        font-size: var(--font-size-m);
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: var(--space-m);
      width: 100%;

      &__item {
        &--2x2 {
          grid-column: span 2;
          grid-row: span 2;

          :deep(h2) {
            font-size: var(--font-size-4xl);
            font-family: var(--font-manrope-semibold);
            line-height: 1;
          }
        }

        &--2x1 {
          grid-column: span 2;

          .custom-item {
            :deep(h2) {
              font-size: var(--font-size-m);
              font-weight: 400;
              line-height: 1.2;
            }
          }

          :deep(.article__info-section__additional) {
            display: none;
          }
        }

        &--1x1 {
          .custom-item {
            :deep(h2) {
              font-size: var(--font-size-m);
              font-weight: 400;
            }

            :deep(.article__info-section__additional) {
              display: none;
            }
          }
        }
      }

      @include w-max($xl) {
        grid-template-columns: repeat(3, 1fr);

        &__item {
          &--2x2 {
            grid-column: span 2;
            grid-row: span 1;
          }

          &--2x1 {
            grid-column: span 1;
          }
        }
      }

      @include w-max($lg) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include w-max($md) {
        &__item {
          &--2x2 {
            grid-column: span 2;
            grid-row: span 2;

            :deep(h2) {
              font-size: var(--space-2xl);
              font-family: var(--font-manrope-semibold);
              line-height: 1.2;
            }
          }

          &--2x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-size: var(--font-size-s);
                font-weight: 400;
              }
            }
          }

          &--1x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-size: var(--font-size-s);
                font-weight: 400;
              }

              :deep(svg) {
                display: none;
              }

              :deep(svg ~ span) {
                display: none;
              }
            }
          }
        }
      }

      @include w-max($sm) {
        &__item {
          width: fit-content;

          &--2x2 {
            grid-column: span 2;
            grid-row: span 1;

            :deep(h2) {
              font-size: var(--font-size-m);
              font-family: var(--font-manrope-regular);
              font-weight: 400;
              line-height: 1.5;
            }

            :deep(svg) {
              display: none;
            }

            :deep(svg ~ span) {
              display: none;
            }
          }

          &--2x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-weight: 400;
                font-size: var(--font-size-m);
                line-height: 1.5;
              }

              :deep(svg) {
                display: none;
              }

              :deep(svg ~ span) {
                display: none;
              }

              :deep(.article__info-section__additional) {
                display: flex;
              }
            }
          }

          &--1x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-weight: 400;
                font-size: var(--font-size-m);
                line-height: 1.5;
              }

              :deep(svg) {
                display: none;
              }

              :deep(svg ~ span) {
                display: none;
              }

              :deep(.article__info-section__additional) {
                display: flex;
              }
            }
          }
        }
      }

      @include w-max($xs) {
        &__item {
          width: fit-content;

          &--2x2 {
            :deep(h2) {
              font-size: var(--font-size-s);
            }

            :deep(svg) {
              display: none;
            }

            :deep(svg ~ span) {
              display: none;
            }
          }

          &--2x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-size: var(--font-size-s);
                font-weight: 400;
              }

              :deep(svg) {
                display: none;
              }

              :deep(svg ~ span) {
                display: none;
              }
            }
          }

          &--1x1 {
            .custom-item {
              :deep(h2) {
                font-size: var(--font-size-s);
                font-weight: 400;
              }

              :deep(svg) {
                display: none;
              }

              :deep(svg ~ span) {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
