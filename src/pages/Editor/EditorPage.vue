<template>
  <EditorTimeline
    :step="currentTab.id"
    @setTab="setTab"
  />
  <Transition mode="out-in">
    <KeepAlive>
      <component
        :is="currentTabComponent"
        v-model="articleModel"
        :editor="editor"
        :tableItems="tableItems"
        :mainPanelItems="mainPanelItems"
        :emojis="emojis"
        :headingItems="headingItems"
        :alignItems="alignItems"
        :articlePreview="articlePreview"
        class="temp"
        @publishArticle="publishArticle"
        @saveArticle="saveArticle"
      />
    </KeepAlive>
  </Transition>
  <EditorPopup
    v-if="editor"
    :items="popupItems"
    :editor="editor"
  />
  <EditorControls
    :editor="editor"
    :step="currentTab.id"
    @publish="publishArticle"
    @save="saveArticle"
    @setTab="setTab"
  />
</template>

<script setup lang="ts">
  import type { Editor } from '@tiptap/vue-3';

  import { computed, onBeforeUnmount, ref } from 'vue';

  import EditorForm from '@components/Editor/EditorForm.vue';
  import EditorTimeline from '@components/Editor/EditorTimeline.vue';
  import EditorControls from '@/components/Editor/EditorControls.vue';
  import EditorPopup from '@/components/Editor/EditorPopup.vue';
  import { useArticlesStore } from '@/stores/articlesStore/store';
  import { useMediaStore } from '@/stores/mediaStore/store';
  import { useEditorOptions } from '@/composables/useEditorOptions';
  import { dataUrlToFile } from '@/utils/dataUrlToFile';
  import { getFilePath } from '@/utils/getFilePath';
  import type { EditorPanelItem, EmojiItem } from '@/types/Editor';
  import type { ArticleModel, ArticlePreview, SelectedItemTab } from './types';
  import EditorArticle from './components/EditorArticle.vue';
  import EditorArticlePreview from './components/EditorArticlePreview.vue';

  const { addArticle } = useArticlesStore();
  const { addMedia } = useMediaStore();

  const placeholder = 'Start typing here';

  const {
    editor,
    popupOptions,
    mainPanelOptions,
    editorOptions,
    tableSettingsOptions,
    headingOptions,
    alignOptions,
  } = useEditorOptions(placeholder);

  const emojis = computed<EmojiItem[]>(() => {
    if (editor.value?.storage.emoji.emojis) {
      return editor.value?.storage.emoji.emojis;
    } else {
      return [];
    }
  });

  const popupItems = computed<EditorPanelItem[]>(() => {
    if (editor) {
      return popupOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const mainPanelItems = computed<EditorPanelItem[]>(() => {
    if (editor) {
      return mainPanelOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const tableItems = computed<EditorPanelItem[]>(() => {
    if (editor) {
      return tableSettingsOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const headingItems = computed<EditorPanelItem[]>(() => {
    if (editor) {
      return headingOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const alignItems = computed<EditorPanelItem[]>(() => {
    if (editor) {
      return alignOptions.map((item: string) => editorOptions.value[item]);
    } else return [];
  });

  const tabs = [
    {
      id: 1,
      component: EditorArticle,
    },
    {
      id: 2,
      component: EditorForm,
    },
    {
      id: 3,
      component: EditorArticlePreview,
    },
  ];

  const currentTab = ref<SelectedItemTab>(tabs[0]);

  const currentTabComponent = computed(() => {
    return tabs[currentTab.value.id - 1].component;
  });

  const articleModel = ref<ArticleModel>({
    title: '',
    description: '',
    authorId: '',
    sectionId: '',
    preview: '',
    tags: [],
  });

  const articlePreview = computed<ArticlePreview>(() => {
    const preview = { ...articleModel.value } as ArticlePreview;
    if (editor.value) {
      preview.content = editor.value.getHTML();
    } else {
      preview.content = '';
    }

    return preview;
  });

  const setTab = (value: number) => {
    const tab = tabs.find((item: SelectedItemTab) => item.id === value);
    if (tab) {
      currentTab.value = tab;
    }
  };

  const replaceImageSrc = async (content: string) => {
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', content);
    const images = template.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      const file = await dataUrlToFile(images[i].src);
      const formdata = new FormData();
      formdata.append('file', file);
      const res = await addMedia(formdata);
      images[i].src = getFilePath(`${res?.mediaUrl as string}`);
    }
    return template;
  };

  const publishArticle = async () => {
    const content = (editor.value as Editor).getHTML();
    const template = await replaceImageSrc(content);

    const tags = JSON.parse(JSON.stringify(articleModel.value.tags));
    const formdata = new FormData();
    formdata.append('title', articleModel.value.title);
    formdata.append('description', articleModel.value.description);
    formdata.append('isPublished', 'false');
    formdata.append('sectionId', articleModel.value.sectionId);
    formdata.append('authorId', articleModel.value.authorId);
    formdata.append('content', template.innerHTML);
    formdata.append('preview', articleModel.value.preview);
    tags.forEach((tag: { name: string; id: string }) => {
      formdata.append('tags', tag.name);
    });
    addArticle(formdata);
  };

  const saveArticle = () => {
    alert('saved to your drafts');
  };

  onBeforeUnmount(() => {
    editor.value?.destroy();
  });
</script>
