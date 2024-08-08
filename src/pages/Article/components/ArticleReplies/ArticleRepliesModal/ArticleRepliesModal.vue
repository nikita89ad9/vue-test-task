<template>
  <div class="wrapper">
    <div
      v-if="modalState"
      ref="modal"
      class="modal"
    >
      <div class="replies">
        <ArticleRepliesItem
          v-for="item in replies"
          :key="item.id"
          :comment="item"
          :editable="item.user.id === userID"
          @deleteComment="id => deleteComment(id)"
          @cancelUpdate="cancelUpdate"
          @updateComment="(content, id) => updateComment(content, id)"
          @toggleRepliesModalState="(state: boolean) => (inUse = state)"
        />
      </div>
      <BaseLayout>
        <ArticleCommentsEditor
          class="replies__editor"
          @addComment="(value: string) => emits('addComment', value)"
        />
      </BaseLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { ref } from 'vue';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import type { ICommentDTO } from '@/services/comments/comments.types';
  import ArticleCommentsEditor from '../../ArticleCommentsEditor/ArticleCommentsEditor.vue';
  import ArticleRepliesItem from '../ArticleRepliesItem/ArticleRepliesItem.vue';

  defineProps<{
    replies: ICommentDTO[] | null;
    modalState: boolean;
    userID: string;
  }>();

  const emits = defineEmits<{
    (e: 'addComment', value: string): void;
    (e: 'repliesClose'): void;
    (e: 'cancelUpdate'): void;
    (e: 'deleteComment', id: string): void;
    (e: 'updateComment', content: string, id: string): void;
  }>();

  const deleteComment = (id: string) => {
    emits('deleteComment', id);
    inUse.value = false;
  };

  const updateComment = (content: string, id: string) => {
    emits('updateComment', content, id);
    inUse.value = false;
  };

  const cancelUpdate = () => {
    emits('cancelUpdate');
    inUse.value = false;
  };

  const modal = ref<HTMLDialogElement | null>(null);

  const inUse = ref(false);

  onClickOutside(modal, () => {
    if (!inUse.value) {
      emits('repliesClose');
    }
  });
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100dvw;
    height: 100dvh;
    background: rgba($color: #000, $alpha: 50%);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;
    z-index: 5;

    .modal {
      width: 40%;
      min-width: 480px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background: var(--color-background-secondary);

      @include w-max($sm) {
        min-width: calc(100% - 50px);
      }
    }

    .replies {
      display: flex;
      flex-direction: column;
      padding: var(--space-m);
      gap: var(--space-m);
      max-height: 95vh;
      overflow-y: auto;

      &__editor {
        border-radius: 0;
      }
    }
  }
</style>
