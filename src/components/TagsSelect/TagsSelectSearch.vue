<template>
  <div class="select-search">
    <BaseInput
      v-model="searchValue"
      variant="contained"
      :placeholder="placeholder"
      class="select-search__input"
    >
      <template #prepend-icon>
        <IconWrapper
          :icon="icons.search"
          regular
          class="select-search__icon"
        />
      </template>
      <template #append-icon="{ clear }">
        <IconWrapper
          :icon="icons.close"
          class="select-search__close"
          @click="clear()"
        />
      </template>
    </BaseInput>
    <button
      class="select-search__button"
      :disabled="isButtonDisabled"
      :title="$t('editor.select.add')"
      @click="addNewTag"
    >
      <IconWrapper
        :icon="icons.plusIcon"
        class="select-search__icon select-search__icon_add"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import IconWrapper from '@components/IconWrapper.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import { icons } from '@/utils/icons';
  import type { ITagsSelectProps } from './types';

  const props = defineProps<{
    options: ITagsSelectProps[];
  }>();

  const emit = defineEmits<{
    (e: 'addTag', value: string): void;
    (e: 'filterTags', value: string): void;
  }>();

  const { t } = useI18n();

  const searchValue = ref<string>('');

  const placeholder = computed(() => t('editor.select.search'));

  const isTagUnique = computed(() => {
    return props.options.every(item => item.name !== searchValue.value);
  });

  const isButtonDisabled = computed(() => {
    return !(isTagUnique.value && searchValue.value.length !== 0);
  });

  watch(searchValue, () => {
    emit('filterTags', searchValue.value);
  });

  const addNewTag = () => {
    emit('addTag', searchValue.value);
    searchValue.value = '';
  };
</script>

<style scoped lang="scss">
  .select-search {
    padding: var(--space-m);
    display: flex;

    &__input {
      width: 100%;

      :deep(.input__wrapper) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &__icon {
      width: var(--space-xl);
      height: var(--space-xl);
    }

    &__clear {
      width: var(--space-m);
      height: var(--space-m);
    }

    &__icon_add {
      :deep(path) {
        fill: #fff;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 41.6px;
      border-radius: var(--space-border-s);
      background: var(--color-background-secondary);
      color: var(--color-third);
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      cursor: pointer;
      transition: var(--transition-even);

      .select-search__icon_add {
        :deep(path) {
          fill: var(--color-third);
        }
      }

      &:disabled {
        cursor: auto;
      }

      &:not(:disabled) {
        background: #4bb543;

        &:hover {
          background: #43a33c;
        }

        .select-search__icon_add {
          :deep(path) {
            fill: #fff;
          }
        }
      }
    }

    @include w-max($xs + 40) {
      max-width: 300px;
    }
  }
</style>
