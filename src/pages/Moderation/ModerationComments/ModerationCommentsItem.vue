<template>
  <BaseLayout v-if="comment">
    <div class="comment">
      <div class="comment__selection comment-selection">
        <div class="comment-selection_left">
          <BaseCheckbox
            v-model="isSelected"
            name="isSelected"
          />
          <h2 class="comment-response comment__response">
            {{ $t('moderation.comments.responseTo') }}
            <span
              class="comment-response__article"
              @click="
                router.push({ name: 'Article', params: { articleID: comment.parentArticleId } })
              "
              >{{ comment.parentArticle.title }}</span
            >
          </h2>
        </div>
        <div class="comment-selection_right">
          <button
            class="comment-selection__button"
            :title="$t('moderation.comments.blockUser')"
            @click="openBlockModal"
          >
            <IconWrapper
              class="comment-selection__icon"
              :icon="icons.block"
            />
            {{ $t('moderation.comments.blockUser') }}
          </button>
          <button
            class="comment-selection__button"
            :title="$t('moderation.comments.deleteComment')"
            @click="openDeleteModal"
          >
            <IconWrapper
              class="comment-selection__icon"
              :icon="icons.delete"
            />
            {{ $t('moderation.comments.deleteComment') }}
          </button>
        </div>
      </div>
      <div class="comment__main">
        <div class="comment__header">
          <div class="comment__created">
            <UserBadge avatarSize="40">
              {{ username }}
            </UserBadge>
            <Date :utcDate="comment.createdAt" />
          </div>
        </div>
        <p class="comment__content">
          {{ comment.content }}
        </p>
      </div>
    </div>
    <BaseModal ref="modalBlock">
      <template #modal="{ close }">
        <div class="confirmation">
          <h2 class="confirmation__header">{{ $t('moderation.comments.confirmBlock') }}</h2>
          <div class="confirmation__buttons">
            <BaseButton
              neutral
              class="confirmation__button"
              @click="close"
              >{{ $t('general.cancel') }}
            </BaseButton>
            <BaseButton
              class="confirmation__button"
              @click="blockUser(close)"
              >{{ $t('moderation.comments.blockUser') }}
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseModal ref="modalDelete">
      <template #modal="{ close }">
        <div class="confirmation">
          <h2 class="confirmation__header">{{ $t('moderation.comments.confirmDelete') }}</h2>
          <div class="confirmation__buttons">
            <BaseButton
              neutral
              class="confirmation__button"
              @click="close"
              >{{ $t('general.cancel') }}
            </BaseButton>
            <BaseButton
              class="confirmation__button"
              @click="deleteComment(close)"
              >{{ $t('moderation.comments.deleteComment') }}
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseCheckbox from '@/components/common/BaseCheckbox/BaseCheckbox.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import Date from '@/components/Date/Date.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import type { ICommentDTO } from '@/services/comments/comments.types';
  import { icons } from '@/utils/icons';
  import router from '@/router';

  const props = defineProps<{
    comment: ICommentDTO;
  }>();

  const emits = defineEmits<{
    (e: 'deleteComment', id: string): void;
    (e: 'blockUser', id: string): void;
  }>();

  const isSelected = ref(false);

  const username = computed(() =>
    props.comment.user.name
      ? `${props.comment.user.name} ${props.comment.user.surname}`
      : props.comment.user.email
  );

  const modalBlock = ref<InstanceType<typeof BaseModal> | null>(null);

  const openBlockModal = () => {
    modalBlock.value?.toggleModalStatus();
  };

  const blockUser = (callback: () => void) => {
    emits('blockUser', props.comment.userId);
    callback();
  };

  const modalDelete = ref<InstanceType<typeof BaseModal> | null>(null);

  const openDeleteModal = () => {
    modalDelete.value?.toggleModalStatus();
  };

  const deleteComment = (callback: () => void) => {
    emits('deleteComment', props.comment.id);
    callback();
  };
</script>

<style scoped lang="scss">
  .comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-s);

    &-selection {
      display: flex;
      justify-content: space-between;

      .checkbox {
        max-width: var(--space-2xl);
      }

      &_left,
      &_right {
        display: flex;
      }

      &_left {
        gap: var(--space-s);
      }

      &_right {
        gap: var(--space-s);
      }

      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-2xs);
        cursor: pointer;
        background: transparent;
        color: var(--color-font-secondary);
      }

      &__icon {
        width: var(--space-m);
        height: var(--space-m);

        :deep(path) {
          fill: var(--color-font-secondary);
        }
      }
    }

    &-response {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
      font-size: var(--font-size-xs);
      text-wrap: nowrap;

      &__article {
        color: var(--color-extra-link-primary);
        cursor: pointer;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-xs);
    }

    &__created {
      display: flex;
      align-items: center;
      gap: var(--space-m);

      :deep(.date) {
        font-size: var(--font-size-2xs);
      }
    }

    &__content {
      font-size: var(--font-size-s);
      color: var(--color-font-primary);
      text-align: justify;
      line-height: 1.5;

      @include w-max($md) {
        font-size: var(--font-size-xs);
      }
    }

    &__flag {
      background: transparent;
      cursor: pointer;
    }

    &-list {
      &__item {
        font-size: var(--font-size-s);
        padding: var(--space-s) var(--space-l);
        cursor: pointer;

        &:hover {
          background: var(--color-extra-light);
        }
      }
    }

    &-actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: var(--space-3xl);
      color: var(--color-font-secondary);
      font-size: var(--font-size-xs);

      &__item {
        display: flex;
        gap: 6px;
        align-items: center;
        cursor: pointer;

        &__icon {
          width: var(--space-m);
          height: var(--space-m);
        }

        :deep(path) {
          fill: var(--color-font-secondary);
        }

        &:hover {
          color: var(--color-font-primary);

          :deep(path) {
            fill: var(--color-font-primary);
          }
        }
      }
    }

    &__divider {
      background-color: var(--color-font-third);
      margin-bottom: var(--space-xs);
    }
  }

  .confirmation {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    max-width: 400px;

    &__header {
      font-size: var(--font-size-l);
      line-height: 1.5;
      text-align: center;

      @include w-max($sm) {
        font-size: var(--font-size-s);
      }
    }

    &__buttons {
      display: flex;
      justify-content: center;
      gap: var(--space-s);
    }

    &__button {
      flex-grow: 0;
      align-self: flex-start;
    }
  }
</style>
