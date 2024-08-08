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
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <BaseModal>
      <template #trigger>
        <BaseButton>
          {{ t('admin.tabs.buttons.tag') }}
        </BaseButton>
      </template>
      <template #modal="{ close }">
        <TagsForm
          :tagModel="tagModel"
          @executeCallback="
            (data: ITagDTOCreateReq) => {
              addTag(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useTagsStore } from '@/stores/tagsStore/store';
  import type { ITagDTOCreateReq } from '@/services/tags/tags.types';
  import { icons } from '@/utils/icons';
  import type { TagModel } from './types';
  import TagsForm from './components/TagsForm.vue';

  const emit = defineEmits<(e: 'updateSearch', value: string) => void>();

  const { addTag } = useTagsStore();

  const { t } = useI18n();

  const search = ref<string>('');

  const tagModel = reactive<TagModel>({
    name: '',
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
