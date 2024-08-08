<template>
  <div class="article-page">
    <ArticleContent
      :data="selectedArticle"
      :showMetrics="true"
      :articleID="selectedArticle ? selectedArticle.id : null"
    />
    <ArticleComments
      :comments="comments"
      :userID="user?.id as string"
      @addComment="addNewComment"
      @deleteComment="deleteComment"
      @updateComment="(content: string, id: string) => updateComment(id, content)"
    />
    <ArticleRecommendations :items="recommendedItemMock" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { onBeforeRouteUpdate } from 'vue-router';

  import { recommendedItemMock } from '@components/RecommendedItem/mock';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useCommentsStore } from '@/stores/commentsStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import ArticleComments from '../components/ArticleComments/ArticleComments/ArticleComments.vue';
  import ArticleContent from '../components/ArticleContent/ArticleContent.vue';
  import ArticleRecommendations from '../components/ArticleRecommendations/ArticleRecommendations.vue';

  const { user } = storeToRefs(useUserStore());

  const { selectedArticle } = storeToRefs(useArticlesStore());
  const { getArticle } = useArticlesStore();

  const { comments } = storeToRefs(useCommentsStore());
  const { getComments, addComment, updateComment, deleteComment } = useCommentsStore();

  const route = useRoute();
  const articleID = computed(() => route.params.articleID as string);

  const addNewComment = (content: string, parentID: string | undefined) => {
    if (selectedArticle.value && user.value) {
      const comment = {
        content,
        parentArticleId: selectedArticle.value?.id,
        parentCommentId: parentID ?? null,
        userId: user.value?.id,
      };
      addComment(comment);
    }
  };

  onMounted(async () => {
    await getArticle(articleID.value);
    getComments();
  });

  onBeforeRouteUpdate(async () => {
    await getArticle(articleID.value);
    getComments();
  });
</script>

<style scoped lang="scss">
  .article-page {
    width: 100%;
    max-width: 1340px;
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
    margin: 0 auto;
  }
</style>
