<template>
  <div class="wrapper">
    <div class="filters">
      <BaseInput
        v-model="search"
        :placeholder="$t('general.search')"
        @update:modelValue="value => emit('updateSearch', value)"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
        <template #append-icon="{ clear }">
          <IconWrapper
            :icon="icons.close"
            class="filters__close"
            regular
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <BaseModal>
      <template #trigger>
        <BaseButton>
          {{ t('admin.tabs.buttons.article') }}
        </BaseButton>
      </template>
      <template #modal="{ close }">
        <ArticlesForm
          :tags="tags"
          :user="user"
          :sections="sections"
          :articleModel="articleModel"
          @executeCallback="
            (data: FormData) => {
              addArticle(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import type { IAuthDTO } from '@/services/auth/auth.types';
  import type { ITagDTO } from '@/services/tags/tags.types';
  import { icons } from '@/utils/icons';
  import type { ArticleModel } from './types';
  import ArticlesForm from './components/ArticlesForm.vue';

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  defineProps<{
    user: IAuthDTO | undefined;
    tags: ITagDTO[];
  }>();

  const emit = defineEmits<(e: 'updateSearch', value: string) => void>();

  const { addArticle } = useArticlesStore();

  const { t } = useI18n();

  const search = ref<string>('');

  const articleModel = reactive<ArticleModel>({
    title: '',
    description: '',
    content: '',
    authorId: '',
    sectionId: '',
    preview: '',
    tags: [],
  });

  onMounted(() => {
    getSections();
  });
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filters {
      display: flex;
      align-items: center;
      gap: var(--space-m);
      margin-right: var(--space-m);

      &__clear {
        width: var(--space-m);
        height: var(--space-m);
      }

      @include w-max($sm) {
        overflow-x: auto;
      }
    }
  }
</style>
