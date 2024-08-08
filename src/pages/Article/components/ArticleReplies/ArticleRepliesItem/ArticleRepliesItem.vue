<template>
  <ArticleCommentsEditor
    v-if="isEditing"
    :updating="true"
    :initialValue="comment.content"
    @cancelUpdate="cancelUpdate"
    @updateComment="(value: string) => emits('updateComment', value, comment.id)"
  />
  <div
    v-else
    class="reply"
  >
    <div class="reply__created">
      <UserBadge avatarSize="30">
        {{ username }}
      </UserBadge>
      <Date :utcDate="props.comment.createdAt" />
    </div>
    <p class="reply__text">
      {{ comment.content }}
    </p>
    <div
      v-if="editable"
      class="reply__buttons"
    >
      <BaseButton
        small
        @click="toggleModalStatus"
        >{{ $t('articles.comments.delete') }}</BaseButton
      >
      <BaseButton
        small
        success
        @click="startEditing"
        >{{ $t('articles.comments.edit') }}</BaseButton
      >
    </div>
    <BaseModal
      ref="modal"
      :closeOnClickOutside="false"
    >
      <template #modal>
        <div class="confirmation">
          <h2 class="confirmation__header">{{ $t('articles.comments.confirm_deletion') }}</h2>
          <BaseButton
            class="confirmation__button"
            @click="deleteComment(props.comment.id)"
          >
            {{ $t('articles.comments.delete') }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { computed, ref } from 'vue';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import Date from '@/components/Date/Date.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import type { ICommentDTO } from '@/services/comments/comments.types';
  import ArticleCommentsEditor from '../../ArticleCommentsEditor/ArticleCommentsEditor.vue';

  const props = defineProps<{
    comment: ICommentDTO;
    editable: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'cancelUpdate'): void;
    (e: 'deleteComment', id: string): void;
    (e: 'toggleRepliesModalState', state: boolean): void;
    (e: 'updateComment', content: string, id: string): void;
  }>();

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  onClickOutside(modal, () => {
    if (modal.value?.isModalOpen) {
      modal.value.toggleModalStatus();
      emits('toggleRepliesModalState', false);
    }
  });

  const username = computed(() =>
    props.comment.user.name
      ? `${props.comment.user.name} ${props.comment.user.surname}`
      : props.comment.user.email
  );

  const isEditing = ref(false);

  const startEditing = () => {
    isEditing.value = !isEditing.value;
    emits('toggleRepliesModalState', true);
  };

  const deleteComment = (id: string) => {
    emits('deleteComment', id);
    emits('toggleRepliesModalState', false);
  };

  const cancelUpdate = () => {
    isEditing.value = false;
    emits('cancelUpdate');
  };

  const toggleModalStatus = () => {
    emits('toggleRepliesModalState', true);
    modal.value?.toggleModalStatus();
  };
</script>

<style scoped lang="scss">
  .reply {
    display: flex;
    flex-direction: column;
    padding: var(--space-l);
    background: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    border-radius: var(--space-border-s);

    &__buttons {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-xs);
    }

    &__created {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-xs);

      :deep(.date) {
        font-size: var(--font-size-xs);
      }
    }

    &__text {
      text-align: justify;
      font-size: var(--font-size-s);
      color: var(--color-font-primary);
      line-height: 1.5;
      margin-bottom: var(--space-s);
    }

    @include w-max($md) {
      &__text {
        font-size: var(--font-size-xs);
      }
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
