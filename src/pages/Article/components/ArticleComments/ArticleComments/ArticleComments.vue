<template>
  <BaseLayout>
    <ArticleCommentsEditor @addComment="(value: string) => emits('addComment', value)" />
  </BaseLayout>
  <div
    v-if="comments.length"
    class="comments__wrapper"
  >
    <h3 class="comments__heading">
      {{ $t('articles.comments.title') }}: {{ filteredComments.length }}
    </h3>
    <div class="comments__content">
      <ArticleCommentItem
        v-for="(item, index) in filteredComments"
        :key="item.id"
        :comment="item"
        :commentIndex="item.id"
        :editable="item.user.id === userID"
        :repliesCount="repliesCount[index]"
        @replyModal="replyModalOpen"
        @deleteComment="(id: string) => emits('deleteComment', id)"
        @updateComment="(value: string, id: string) => emits('updateComment', value, id)"
      />
    </div>
    <Transition name="fade">
      <ArticleRepliesModal
        v-if="modalState"
        :replies="currentReplies"
        :modalState="modalState"
        :userID="userID"
        @repliesClose="replyModalClose"
        @addComment="(value: string) => emits('addComment', value, parentCommentId)"
        @deleteComment="(id: string) => emits('deleteComment', id)"
        @updateComment="(value: string, id: string) => emits('updateComment', value, id)"
      />
    </Transition>
  </div>
  <BasePlaceholder
    v-else
    :placeholderText="$t('articles.comments.noComments')"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import ArticleCommentsEditor from '@pages/Article/components/ArticleCommentsEditor/ArticleCommentsEditor.vue';
  import ArticleRepliesModal from '@pages/Article/components/ArticleReplies/ArticleRepliesModal/ArticleRepliesModal.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
  import type { ICommentDTO } from '@services/comments/comments.types';
  import ArticleCommentItem from '../ArticleCommentItem/ArticleCommentItem.vue';

  const props = defineProps<{
    comments: ICommentDTO[];
    userID: string;
  }>();

  const emits = defineEmits<{
    (e: 'addComment', value: string, id?: string): void;
    (e: 'deleteComment', id: string): void;
    (e: 'updateComment', content: string, id: string): void;
  }>();

  const filteredComments = computed(() =>
    props.comments.filter(item => item.parentCommentId === null)
  );

  const repliesCount = computed(() => {
    const num: number[] = [];
    filteredComments.value.forEach(parent => {
      num.push(props.comments.filter(el => el.parentCommentId === parent.id).length);
    });
    return num;
  });

  const modalState = ref<boolean>(false);
  const parentCommentId = ref<string>('');

  const currentReplies = computed(() =>
    props.comments.filter(item => item.parentCommentId === parentCommentId.value)
  );

  const replyModalOpen = (id: string) => {
    parentCommentId.value = id;
    modalState.value = true;
  };

  const replyModalClose = () => {
    modalState.value = false;
  };
</script>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    &__heading {
      font-size: var(--font-size-l);
      text-align: center;
    }

    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &_empty {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size-s);
    }
  }
</style>
