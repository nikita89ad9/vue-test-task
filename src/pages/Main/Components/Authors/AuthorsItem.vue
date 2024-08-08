<template>
  <div class="author">
    <div class="author__header"></div>
    <div class="author__avatar">
      <BaseAvatar
        :src="avatarUrl"
        @error="e => setAltImg(e, '/avatarSample.png')"
      />
    </div>
    <div class="author__description author-description">
      <div class="author-description__content">
        <div class="author-description__header">
          <div>
            <h4
              class="author-description__name"
              @click="handleCardClick"
            >
              {{ stringCutter(author.name, 25) }}
            </h4>
            <p class="author-description__position">{{ stringCutter(author.jobTitle, 35) }}</p>
          </div>
          <BaseButton
            class="author-description__button"
            @click="handleClickSubscribe"
          >
            {{ $t('general.subscribe') }}
          </BaseButton>
        </div>
        <p class="author-description__text">{{ author.description }}</p>
      </div>
      <BaseButton
        class="author__button"
        @click="handleClickSubscribe"
      >
        {{ $t('general.subscribe') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DOMAIN } from '@env/env.d.ts';

  import { computed } from 'vue';

  import BaseAvatar from '@/components/common/BaseAvatar/BaseAvatar.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import { setAltImg } from '@/utils/setAltImage';
  import { stringCutter } from '../../helpers';
  import type { IAuthor } from '../../types';

  const props = defineProps<{
    author: IAuthor;
  }>();

  const emit = defineEmits<(e: 'redirectToTarget', id: string) => void>();

  const avatarUrl = computed<string>(() =>
    props.author.avatar ? `${DOMAIN}/${props.author.avatar.mediaUrl}` : '/avatarSample.png'
  );

  const handleCardClick = () => {
    emit('redirectToTarget', props.author.id);
  };

  const handleClickSubscribe = () => {
    alert('Subscribed');
  };
</script>

<style scoped lang="scss">
  .author {
    position: relative;
    max-width: 350px;
    min-height: 450px;
    transition: var(--transition-default);
    border-radius: var(--space-border-s);
    overflow: hidden;
    border: 1px solid var(--color-extra-light);
    box-shadow: var(--shadow-widget);
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
    }

    &__header {
      height: 150px;
      width: 100%;
      background: var(--color-primary);
    }

    &__description {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(70px + 8px) 32px 32px 32px;
      min-height: 300px;
      background: transparent;
      text-align: center;
    }

    &__avatar {
      position: absolute;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      height: 140px;
      width: 140px;
      border-radius: 50%;
      overflow: hidden;

      :deep(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .author-description {
      &__content {
        margin-bottom: var(--space-xl);
      }

      &__header {
        text-align: center;
      }

      &__name {
        color: var(--color-primary);
        font-size: var(--font-size-xm);
        margin-bottom: var(--space-xs);
        text-align: center;
      }

      &__position {
        font-size: var(--font-size-xs);
        color: var(--color-font-secondary);
      }

      &__text {
        margin-top: var(--space-m);
        font-size: var(--font-size-s);
        line-height: 1.5;
      }

      &__button {
        display: none;
      }
    }

    @include w-max($xxl) {
      min-height: auto;

      &__header {
        height: 100px;
      }

      &__description {
        padding-top: 58px;
      }

      &__avatar {
        width: 100px;
        height: 100px;
        top: 50px;
      }
    }

    @include w-max($md) {
      max-width: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      height: auto;
      padding: var(--space-xl);

      &__avatar {
        position: static;
        transform: translateX(0);
        width: 70px;
        height: 70px;
        min-width: 70px;
      }

      &__header {
        display: none;
      }

      .author-description {
        padding: 0 0 0 var(--space-s);
        min-height: auto;
        align-items: flex-start;

        &__content,
        &__name,
        &__position {
          text-align: left;
        }

        &__content {
          margin: 0;
        }

        &__button {
          display: flex;
          align-self: flex-start;
        }

        &__header {
          display: flex;
          justify-content: space-between;
        }
      }

      &__button {
        display: none;
      }
    }

    @include w-max($sm) {
      padding: var(--space-s);

      &__avatar {
        width: 50px;
        height: 50px;
        min-width: 50px;
      }

      .author-description {
        &__name {
          margin-bottom: var(--space-2xs);
          font-size: var(--font-size-s);
        }

        &__text {
          font-size: var(--font-size-xs);
        }

        &__position {
          text-align: left;
        }
      }
    }

    @include w-max($xs) {
      position: relative;
      flex-direction: column;

      &__avatar {
        margin-bottom: var(--space-2xs);
      }

      .author-description {
        padding-left: 0;
        font-size: 20px;

        &__button {
          position: absolute;
          right: var(--space-s);
          top: var(--space-s);
        }

        &__header {
          flex-flow: row nowrap;
          width: 100%;
        }
      }

      &:hover {
        transform: none;
      }
    }
  }
</style>
