<template>
  <BaseModal>
    <template #trigger>
      <button
        :class="['trigger', { trigger_active: active }]"
        :title="$t(`editor.options.addLink`)"
      >
        <IconWrapper :icon="icons.editorIcons.link" />
      </button>
    </template>
    <template #modal="{ close }">
      <div class="link-modal">
        <BaseInput
          v-model="link"
          placeholder="URL"
          class="link-modal__input"
          :label="$t(`editor.options.addLink`)"
        />
        <BaseButton
          class="link-modal__confirm"
          @click="addLink(close)"
        >
          {{ $t(`editor.options.addLink`) }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { Editor } from '@tiptap/vue-3';

  import { computed, ref } from 'vue';

  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import BaseModal from '../common/BaseModal.vue';

  const props = defineProps<{
    editor: Editor | undefined;
  }>();

  const link = ref(props.editor?.getAttributes('link').href);

  const active = computed(() => props.editor?.isActive('link'));

  const addLink = (callback: () => void) => {
    if (link.value === null) {
      return;
    }

    if (link.value === '') {
      props.editor?.chain().extendMarkRange('link').unsetLink().run();
      return;
    }

    props.editor?.chain().extendMarkRange('link').setLink({ href: link.value }).run();
    callback();
  };
</script>

<style scoped lang="scss">
  .trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

    :deep(path) {
      fill: var(--color-font-primary);
    }

    &:hover,
    &_active {
      background: var(--color-third);
      filter: brightness(1.4);
    }

    &_disabled {
      opacity: 0.5;

      &:hover {
        background: transparent;
      }
    }
  }

  .link-modal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 320px;
    position: relative;

    &__title {
      font-size: var(--font-size-l);
      margin-bottom: var(--space-xl);
    }

    &__input {
      width: 100%;
      margin-bottom: var(--space-xl);
    }
  }
</style>
