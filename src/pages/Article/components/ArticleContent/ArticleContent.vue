<template>
  <BaseLayout
    v-if="data"
    class="article"
  >
    <div class="article__data">
      <div class="article__header article-header">
        <h1 class="article-header__title">{{ data.title }}</h1>
        <ArticleReportMenu
          v-if="articleID"
          @toggleModal="() => modal?.toggleModalStatus()"
        />
      </div>
      <div class="article__data-created">
        <UserBadge avatarSize="40">
          {{ data.author.name ? `${data.author.name} ${data.author.surname}` : data.author.email }}
        </UserBadge>
        <Date :utcDate="data.createdAt" />
      </div>
    </div>
    <div class="article__content">
      <ArticleImage
        v-if="data.preview"
        :data="previewImg"
      />
      <div
        class="article__content-paragraphs"
        v-html="data.content"
      ></div>
      <div class="article__content-tags">
        <Tile
          v-for="item in data.tags"
          :key="item.id"
        >
          {{ item.name }}
        </Tile>
      </div>
      <div
        v-if="showMetrics"
        class="article__content-metrics"
      >
        <div class="article__content-metrics__reactions">
          <span class="article__content-metrics__reactions-item">
            <span class="article__content-metrics__reactions-item__count"> 14 </span>
            <span class="article__content-metrics__reactions-item__text">{{
              $t('articles.favourites')
            }}</span>
          </span>
        </div>
      </div>
    </div>
    <BaseModal
      v-if="articleID"
      ref="modal"
    >
      <template #modal="{ close }">
        <ArticleReportForm
          :userId="data.authorId"
          :articleId="articleID"
          @sendReport="
            data => {
              console.log(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  import type { ArticlePreview } from '@/pages/Editor/types';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import Date from '@/components/Date/Date.vue';
  import Tile from '@/components/Tile/Tile.vue';
  import UserBadge from '@/components/UserBadge/UserBadge.vue';
  import type { IArticleDTO } from '@/services/articles/articles.types';
  import { getFilePath } from '@/utils/getFilePath';
  import ArticleImage from '../ArticleImage/ArticleImage.vue';
  import ArticleReportForm from '../ArticleReportForm/ArticleReportForm.vue';
  import ArticleReportMenu from '../ArticleReportMenu/ArticleReportMenu.vue';

  type ArticleContent = IArticleDTO | ArticlePreview | null;

  const props = defineProps<{
    data: IArticleDTO | ArticlePreview | null;
    showMetrics: boolean;
    articleID?: string | null;
  }>();

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  function isPreview(article: ArticleContent): article is ArticlePreview {
    const preview = (article as ArticlePreview)?.preview;
    return typeof preview === 'string' || preview instanceof File;
  }

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const previewImg = ref({ src: '', description: '' });

  const articleProps = computed(() => props.data);

  watch(
    articleProps,
    async () => {
      if (isPreview(props.data)) {
        const imgUrl = (await toBase64(props.data.preview as File)) as string;
        previewImg.value.src = imgUrl;
      } else {
        previewImg.value.src = getFilePath(props.data?.preview?.mediaUrl as string);
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .article {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &-header {
      display: flex;
      justify-content: space-between;

      &__title {
        font-size: var(--font-size-xl);
        color: var(--color-font-primary);
      }
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      &-created {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);

      &-paragraphs {
        font-size: var(--font-size-s);
        color: var(--color-font-primary);
        text-align: justify;

        :deep(p) {
          line-height: var(--line-height-text-l);
          margin: var(--space-m) 0;
          display: flex;

          span {
            color: var(--color-font-primary);
            line-height: var(--line-height-text-l);
          }

          code {
            line-height: var(--line-height-text-l);
          }

          a {
            color: var(--color-extra-link-primary);
          }
        }

        :deep(table) {
          width: 100%;
          border: var(--border-light);
          border-collapse: collapse;
          margin: var(--space-s) 0;

          th,
          td {
            border: var(--border-light);
            padding: var(--space-s);

            p {
              margin: 0;
            }
          }
        }

        :deep(img) {
          margin: 0 auto;
        }
      }

      &-tags {
        display: flex;
        align-items: center;
        gap: var(--space-s);
      }

      &-metrics {
        display: flex;
        justify-content: space-between;
        align-items: center;

        :deep(path) {
          fill: var(--color-font-secondary);
        }

        &__reactions {
          display: flex;
          gap: var(--space-xl);
          color: var(--color-font-secondary);
          font-size: var(--font-size-s);

          &-item {
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            font-size: var(--font-size-s);

            &__count {
              color: var(--color-primary);
            }

            &:hover {
              color: var(--color-font-primary);

              :deep(path) {
                fill: var(--color-font-primary);
              }
            }
          }
        }
      }
    }
  }
</style>
