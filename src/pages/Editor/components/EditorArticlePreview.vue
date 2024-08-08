<template>
  <BaseLayout class="layout_spaced">
    <div class="editor-preview">
      <div class="editor-preview__wrapper">
        <ArticleContent
          v-if="articleData"
          :data="articleData"
          :showMetrics="false"
        />
      </div>
    </div>
    <div class="editor-buttons">
      <BaseButton @click="emit('saveArticle')">
        {{ $t('editor.controls.saveToDrafts') }}
      </BaseButton>
      <BaseButton
        class="editor-buttons__publish"
        @click="emit('publishArticle')"
      >
        {{ $t('editor.controls.publishArticle') }}
      </BaseButton>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';

  import ArticleContent from '@/pages/Article/components/ArticleContent/ArticleContent.vue';
  import BaseLayout from '@components/common/BaseLayout/BaseLayout.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import { useUserStore } from '@/stores/userStore/store';
  import type { ArticlePreview } from '../types';

  const { user } = storeToRefs(useUserStore());

  const props = defineProps<{
    articlePreview: ArticlePreview;
  }>();

  const emit = defineEmits<{
    (e: 'publishArticle'): void;
    (e: 'saveArticle'): void;
  }>();

  const articleData = computed(() => {
    const data = { ...props.articlePreview };
    if (user.value) {
      data.author = user.value;
    }
    data.createdAt = new Date().toUTCString();
    return data;
  });
</script>

<style scoped lang="scss">
  .layout_spaced {
    margin-bottom: var(--space-xl);
  }

  .editor-preview {
    overflow-y: auto;

    &__wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .editor-buttons {
    display: flex;
    justify-content: flex-end;
    padding: var(--space-xl);
    gap: var(--space-s);

    &__publish {
      background: #4bb543;
    }
  }
</style>
