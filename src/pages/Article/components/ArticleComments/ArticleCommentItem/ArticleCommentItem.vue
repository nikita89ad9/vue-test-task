<template>
  <BaseLayout v-if="isEditing">
    <ArticleCommentsEditor
      v-if="isEditing"
      :updating="true"
      :initialValue="comment.content"
      @cancelUpdate="isEditing = !isEditing"
      @updateComment="(value: string) => emits('updateComment', value, comment.id)"
    />
  </BaseLayout>
  <BaseLayout v-else>
    <div class="comment">
      <div class="comment__main">
        <div class="comment__header">
          <div class="comment__created">
            <UserBadge avatarSize="40">
              {{ username }}
            </UserBadge>
            <Date :utcDate="comment.createdAt" />
          </div>
          <BaseDropdown
            closeOnClick
            class="dropdown_bottom dropdown_left"
          >
            <template #trigger>
              <button
                class="comment__flag"
                :title="$t(`editor.options.align`)"
              >
                <IconWrapper :icon="icons.moreVertical" />
              </button>
            </template>
            <template #content>
              <ul class="comment__list comment-list">
                <li class="comment-list__item">Block User</li>
                <li class="comment-list__item">Report User</li>
              </ul>
            </template>
          </BaseDropdown>
        </div>
        <p class="comment__content">
          {{ comment.content }}
        </p>
        <div class="comment__actions comment-actions">
          <div
            class="comment-actions__item replies"
            @click="emits('replyModal', commentIndex)"
          >
            <span
              v-if="repliesCount"
              class="comment-actions__item__count"
            >
              {{ $t('articles.replies') }} : {{ repliesCount }}
            </span>
            <span
              v-else
              class="comment-actions__item__count"
            >
              {{ $t('articles.reply') }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="editable"
        class="comment__buttons"
      >
        <BaseButton
          small
          @click="toggleModalStatus"
          >{{ $t('articles.comments.delete') }}</BaseButton
        >
        <BaseButton
          small
          success
          @click="isEditing = !isEditing"
          >{{ $t('articles.comments.edit') }}</BaseButton
        >
      </div>
    </div>
  </BaseLayout>
  <BaseModal
    ref="modal"
    withoutTrigger
  >
    <template #modal="{ close }">
      <div class="confirmation">
        <h2 class="confirmation__header">{{ $t('articles.comments.confirm_deletion') }}</h2>
        <BaseButton
          class="confirmation__button"
          @click="deleteComment(close)"
        >
          {{ $t('articles.comments.delete') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import Date from '@/components/Date/Date.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import type { ICommentDTO } from '@/services/comments/comments.types';
  import { icons } from '@/utils/icons';
  import ArticleCommentsEditor from '../../ArticleCommentsEditor/ArticleCommentsEditor.vue';

  const props = defineProps<{
    comment: ICommentDTO;
    commentIndex: string;
    editable: boolean;
    repliesCount: number;
  }>();

  const emits = defineEmits<{
    (e: 'cancelUpdate'): void;
    (e: 'deleteComment', id: string): void;
    (e: 'updateComment', content: string, id: string): void;
    (e: 'replyModal', index: string): void;
  }>();

  const isEditing = ref(false);

  const username = computed(() =>
    props.comment.user.name
      ? `${props.comment.user.name} ${props.comment.user.surname}`
      : props.comment.user.email
  );

  const deleteComment = (callback: () => void) => {
    emits('deleteComment', props.comment.id);
    callback();
  };

  const toggleModalStatus = () => {
    modal.value?.toggleModalStatus();
  };

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);
</script>

<style scoped lang="scss">
  .comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-xs);

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
      margin-bottom: var(--space-xl);

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

    &__buttons {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-xs);
    }
  }

  .confirmation {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &__header {
      font-size: var(--font-size-l);
      text-align: center;
      line-height: 1.5;

      @include w-max($sm) {
        font-size: var(--font-size-s);
      }
    }

    &__button {
      flex-grow: 0;
      align-self: flex-start;
      margin: 0 auto;
    }
  }
</style>
