<template>
  <BaseLayout v-if="sections.length">
    <div class="moderation-item">
      <div class="moderation-item__checkbox moderation-checkbox">
        <BaseCheckbox
          :title="$t('moderation.articles.item.select')"
          :modelValue="isSelected"
          name="isItemSelected"
          @update:modelValue="emit('selectItem', article.id)"
        />
      </div>
      <div class="moderation-item__thumbnail">
        <img
          class="moderation-item__image"
          src="/article-preview.png"
        />
      </div>
      <ul class="moderation-item__content moderation-content">
        <li class="moderation-content__item">
          <span class="moderation-content__title">{{ $t('moderation.articles.item.title') }}: </span
          ><span class="moderation-content__text">{{ article.title }}</span>
        </li>
        <li class="moderation-content__item">
          <span class="moderation-content__title"
            >{{ $t('moderation.articles.item.author') }}: </span
          ><span class="moderation-content__text">{{ userName }}</span>
        </li>
        <li class="moderation-content__item">
          <span class="moderation-content__title"
            >{{ $t('moderation.articles.item.section') }}: </span
          ><span class="moderation-content__text">{{ sectionName }}</span>
        </li>
        <li class="moderation-content__item">
          <span class="moderation-content__title">{{ $t('moderation.articles.item.date') }}: </span
          ><span class="moderation-content__text"><Date :utcDate="article.createdAt" /></span>
        </li>
        <li class="moderation-content__item">
          <span class="moderation-content__title"
            >{{ $t('moderation.articles.item.status') }}: </span
          ><span
            :class="[
              'moderation-content__text',
              article.isPublished
                ? 'moderation-content__text_published'
                : 'moderation-content__text_rejected',
            ]"
            >{{ isPublished }}</span
          >
        </li>
      </ul>
      <div class="moderation-item__actions moderation-actions">
        <div class="moderation-actions__option">
          <ModerationButton
            approve
            @click="emit('approveItem', article.id)"
          >
            <template #icon>
              <IconWrapper :icon="icons.checkmark" />
            </template>
            <template #text> {{ $t('moderation.articles.item.approve') }} </template>
          </ModerationButton>
        </div>
        <div class="moderation-actions__option">
          <ModerationButton
            reject
            @click="emit('rejectItem', article.id)"
          >
            <template #icon>
              <IconWrapper :icon="icons.close" />
            </template>
            <template #text> {{ $t('moderation.articles.item.reject') }} </template>
          </ModerationButton>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseLayout from '@components/common/BaseLayout/BaseLayout.vue';
  import BaseCheckbox from '@/components/common/BaseCheckbox/BaseCheckbox.vue';
  import Date from '@/components/Date/Date.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import type { IArticleDTO } from '@/services/articles/articles.types';
  import type { ISectionDTO } from '@/services/sections/sections.types';
  import { icons } from '@/utils/icons';
  import ModerationButton from '../ModerationButton.vue';

  const props = defineProps<{
    article: IArticleDTO;
    sections: ISectionDTO[];
    isSelected: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'selectItem', id: string): void;
    (e: 'approveItem', id: string): void;
    (e: 'rejectItem', id: string): void;
  }>();

  const userName = computed(() => {
    return props.article.author.name
      ? `${props.article.author.name} ${props.article.author.surname}`
      : props.article.author.email;
  });

  const sectionName = computed(() => {
    const item = props.sections.find(item => item.id === props.article.sectionId) as ISectionDTO;
    return item.name;
  });

  const isPublished = computed(() => (props.article.isPublished ? 'Published' : 'Pending'));
</script>

<style scoped lang="scss">
  .moderation-item {
    display: flex;
    gap: var(--space-m);

    &__thumbnail {
      width: 140px;
      height: 140px;
      overflow: hidden;
      flex-shrink: 0;
      border-radius: var(--space-border-s);

      @include w-max($md) {
        width: 90px;
        height: 90px;
      }

      @include w-max($sm) {
        display: none;
      }
    }

    &__image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    &__actions {
      width: 150px;

      @include w-max($md) {
        width: 110px;
      }

      @include w-max($sm) {
        width: auto;
        display: flex;
        justify-content: flex-end;
      }
    }

    @include w-max($sm) {
      &__checkbox {
        display: flex;
        flex-grow: 0;
      }

      gap: var(--space-xs);
      flex-direction: column;
    }
  }

  .moderation {
    &-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: var(--space-2xs);

      &__item {
        display: flex;
        width: 100%;
        font-size: var(--font-size-s);

        @include w-max($md) {
          font-size: var(--font-size-xs);
        }

        @include w-max($sm) {
          padding-left: var(--space-3xl);
          font-size: var(--font-size-2xs);
        }
      }

      &__title {
        display: flex;
        flex-shrink: 0;
        padding-right: var(--space-xs);
        min-width: 90px;
        line-height: 1.5;

        @include w-max($sm) {
          font-weight: 600;
          min-width: 80px;
        }
      }

      &__text {
        color: var(--color-font-secondary);
        line-height: 1.5;

        &_published {
          color: var(--color-success);
        }

        &_rejected {
          color: var(--color-primary);
        }

        @include w-max($md) {
          .date {
            font-size: var(--font-size-xs);
          }
        }

        @include w-max($sm) {
          .date {
            font-size: var(--font-size-2xs);
          }
        }
      }
    }

    &-actions {
      flex-shrink: 0;

      &__option {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
