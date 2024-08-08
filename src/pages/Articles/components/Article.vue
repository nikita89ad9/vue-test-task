<template>
  <div class="articles__item articles-item">
    <div class="articles-item__thumbnail">
      <img
        class="articles-item__image"
        :src="articleURL"
        @error="e => setAltImg(e, '/article-preview.png')"
      />
    </div>
    <div class="articles-item__content">
      <div class="articles-item__main">
        <div class="articles-item__header">
          <UserBadge avatarSize="40">
            {{ username }}
          </UserBadge>
        </div>
        <div class="articles-item__description">
          <h4
            class="articles-item__title"
            @click="emit('navigateToArticle', article.id)"
          >
            {{ article.title }}
          </h4>
          <p class="articles-item__text">
            {{ article.description }}
          </p>
        </div>
      </div>
      <div class="articles-item__tags">
        <template v-if="article.tags">
          <Tile
            v-for="tag in article.tags"
            :key="tag.id"
            >{{ tag.name }}
          </Tile>
        </template>
      </div>
    </div>
    <div class="articles-item__info">
      <ArticleReportMenu @toggleModal="() => modal?.toggleModalStatus()" />
      <p
        v-if="article.createdAt"
        class="articles-item__date"
      >
        {{ formatDate(article.createdAt) }}
      </p>
    </div>
    <BaseModal
      ref="modal"
      withoutTrigger
    >
      <template #modal="{ close }">
        <ArticleReportForm
          :userId="user?.id as string"
          :articleId="article.id"
          @sendReport="
            data => {
              console.log(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, ref } from 'vue';

  import ArticleReportForm from '@/pages/Article/components/ArticleReportForm/ArticleReportForm.vue';
  import ArticleReportMenu from '@/pages/Article/components/ArticleReportMenu/ArticleReportMenu.vue';
  import Tile from '@components/Tile/Tile.vue';
  import UserBadge from '@components/UserBadge/UserBadge.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import { useUserStore } from '@/stores/userStore/store';
  import { formatDate } from '@utils/formatDate';
  import { getFilePath } from '@/utils/getFilePath';
  import { setAltImg } from '@/utils/setAltImage';
  import type { ArticleItem } from '@/types/Articles';

  const { user } = storeToRefs(useUserStore());

  const props = defineProps<{
    article: ArticleItem;
  }>();

  const emit = defineEmits<(e: 'navigateToArticle', value: string) => void>();

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const username = computed(() => {
    return props.article.author.name
      ? `${props.article.author.name} ${props.article.author.surname}`
      : props.article.author.email;
  });

  const articleURL = computed(() => getFilePath(props.article.preview?.mediaUrl));
</script>

<style scoped lang="scss">
  .articles-item {
    display: flex;
    padding: var(--space-xl);
    border-radius: var(--space-border-s);
    background: var(--color-background-primary);
    box-shadow: var(--shadow-widget);

    &__thumbnail {
      display: flex;
      flex-shrink: 0;
      width: 220px;
      height: 220px;
      border-radius: var(--space-border-s);
      overflow: hidden;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: var(--space-l);
      width: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      margin-bottom: var(--space-s);
    }

    &__main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__description {
      margin-bottom: var(--space-l);
    }

    &__title {
      font-size: var(--font-size-xm);
      color: var(--color-font-primary);
      margin-bottom: var(--space-xs);
      cursor: pointer;

      &:hover {
        color: var(--color-primary);
      }
    }

    &__text {
      font-size: var(--font-size-s);
      color: var(--color-font-secondary);
      line-height: var(--space-xl);
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__date {
      font-size: var(--font-size-s);
      color: var(--color-font-secondary);
      white-space: nowrap;
    }

    @include w-max($xl) {
      &__thumbnail {
        width: 120px;
        height: 120px;

        .articles-item__image {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }
      }
    }

    @include w-max($lg) {
      gap: var(--space-xl);

      &__thumbnail {
        display: none;
      }

      &__content {
        padding: 0;
      }

      &__date {
        font-size: var(--font-size-xs);
      }
    }

    @include w-max($sm) {
      &__date {
        display: none;
      }
    }
  }

  .article-item__favourite {
    :deep(path) {
      fill: var(--color-font-secondary);
    }
  }
</style>
