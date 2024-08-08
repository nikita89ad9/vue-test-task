<template>
  <BaseLayout class="meetups">
    <SectionHeader :header="meetupsHeader" />
    <div class="meetups__grid">
      <div
        v-for="(item, index) in itemsArray"
        :key="item.id"
        :class="{
          'meetups__grid__item--2x3': index === 0,
          'meetups__grid__item--1x1': index > 0,
        }"
      >
        <Item
          :item="item"
          class="custom-item"
          image="https://st2.depositphotos.com/2251265/6989/i/950/depositphotos_69890759-stock-photo-bright-office-background.jpg"
        ></Item>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import type { IMeetupDTO } from '@/services/meetups/meetups.types';
  import Item from '../Others/Item.vue';
  import SectionHeader from '../SectionHeader.vue';

  const props = defineProps<{
    meetups: IMeetupDTO[];
  }>();

  const itemsArray = computed(() =>
    props.meetups.map(meetup => {
      return {
        id: meetup.id,
        title: meetup.title,
        description: meetup.description,
        image: meetup.preview.mediaUrl,
        tags: meetup.tags,
        createdAt: meetup.createdAt,
        author: meetup.author.name
          ? `${meetup.author.name} ${meetup.author.surname}`
          : meetup.author.email,
      };
    })
  );

  const meetupsHeader = {
    title: 'general.latestMeetups',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    route: 'Meetups',
  };
</script>

<style scoped lang="scss">
  .meetups {
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
      width: 100%;
      border-radius: var(--space-border-s);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: var(--space-m);

      &__item {
        &--2x3 {
          grid-column: span 2;
          grid-row: span 2;

          .custom-item {
            :deep(h2) {
              font-size: var(--space-4xl);
              font-family: var(--font-manrope-semibold);
            }
          }
        }

        &--1x1 .custom-item {
          :deep(h2) {
            font-size: var(--font-size-m);
            font-weight: 400;
          }

          :deep(.article__info-section__additional) {
            display: none;
          }
        }
      }

      @include w-max($lg) {
        grid-template-columns: 1fr 1fr;
      }

      @include w-max($md) {
        &__item {
          &--2x3 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-size: var(--space-2xl);
                font-family: var(--font-manrope-semibold);
              }
            }
          }

          &--1x1 {
            grid-column: span 2;

            .custom-item {
              :deep(h2) {
                font-weight: 400;
              }
            }
          }
        }
      }

      @include w-max($sm) {
        grid-template-columns: 1fr;

        &__item {
          &--2x3 {
            grid-column: span 1;
            grid-row: span 1;

            .custom-item {
              :deep(h2) {
                font-size: var(--space-ml);
                font-weight: 400;
                font-family: var(--font-manrope-regular);
              }
            }
          }

          &--1x1 {
            .custom-item {
              :deep(h2) {
                font-size: var(--space-ml);
                font-weight: 400;
              }

              :deep(.article__info-section__additional) {
                display: flex;
              }
            }
          }
        }
      }
    }
  }
</style>
