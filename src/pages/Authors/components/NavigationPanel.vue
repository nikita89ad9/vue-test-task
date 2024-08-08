<template>
  <div class="navigation-panel">
    <div class="navigation-panel__header">
      <h3 class="navigation-panel__title">{{ $t('authors.title') }}</h3>
      <span class="navigation-panel__selection">{{ itemsVisible }}</span>
    </div>
    <div class="navigation-panel__controls">
      <div class="navigation-panel__filters">
        <Multiselect
          v-model="authorsModel.departmentsValue"
          :options="departmentsArr"
          :placeholder="placeholders.departments"
          class="navigation-panel__item"
        />
        <Multiselect
          v-model="authorsModel.jobsValue"
          :options="jobsArr"
          :placeholder="placeholders.jobs"
          class="navigation-panel__item"
        />
        <BaseInput
          :modelValue="searchValue"
          error
          :placeholder="placeholders.search"
          variant="contained"
          class="navigation-panel__search"
          @update:modelValue="value => emit('updateSearch', value)"
        >
          <template #prepend-icon>
            <IconWrapper
              :icon="icons.search"
              class="navigation-panel__icon"
              regular
            />
          </template>
          <template #append-icon="{ clear }">
            <IconWrapper
              :icon="icons.close"
              class="navigation-panel__close"
              @click="clear()"
            />
          </template>
        </BaseInput>
      </div>
      <Select
        :modelValue="sortValue"
        :options="sortOptions"
        placeholder="Sorted by"
        class="navigation-panel__select"
        @update:modelValue="value => emit('updateSort', value)"
      >
        <span class="selected-value"> {{ $t('articles.sortedBy') }}: {{ displayValue }}</span>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import Select from '@components/Select/Select.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import Multiselect from '@/components/Multiselect/Multiselect.vue';
  import type { IMultiselectOptionProps } from '@/components/Multiselect/types';
  import { icons } from '@/utils/icons';
  import type { IAuthorsModel, INavPlaceholders } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    modelValue: IAuthorsModel;
    departmentsArr: IMultiselectOptionProps[];
    jobsArr: IMultiselectOptionProps[];
    searchValue: string;
    sortValue: { name: string; value: string };
    sortOptions: { name: string; value: string }[];
    itemsVisible: { start: number; end: number };
    itemsTotal: number;
  }>();

  const emit = defineEmits<{
    (e: 'updateSearch', value: string): void;
    (e: 'updateSort', value: { name: string; value: string }): void;
  }>();

  const placeholders = computed<INavPlaceholders>(() => {
    return {
      departments: t('articles.placeholders.departments'),
      jobs: t('articles.placeholders.jobTitle'),
      search: t('articles.placeholders.search'),
    };
  });

  const authorsModel = ref(props.modelValue);

  const itemsVisible = computed(() => {
    return `${t('navigation.showing')} ${props.itemsVisible.start}-${props.itemsVisible.end} ${t(
      'navigation.outOf'
    )} ${props.itemsTotal}`;
  });

  const displayValue = computed(() => {
    const current = props.sortOptions.find(item => item.value === props.sortValue.value);
    return current?.name;
  });
</script>

<style scoped lang="scss">
  .selected-value {
    font-size: var(--font-size-s);
    color: var(--color-font-secondary);
    cursor: pointer;
    align-items: flex-end;
  }

  .navigation-panel {
    display: flex;
    flex-direction: column;
    background: var(--color-background-primary);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border-radius: var(--space-border-s);
    box-shadow: var(--shadow-widget);

    &__clear {
      width: var(--space-m);
      height: var(--space-m);
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-l);
    }

    &__selection {
      color: var(--color-font-secondary);
      font-size: var(--font-size-s);
      margin-left: var(--space-xl);
    }

    &__controls {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__item {
      width: 200px;
    }

    &__filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-s);
      align-items: flex-end;
    }

    &__select {
      display: flex;
      align-items: flex-end;
      align-self: flex-end;
      flex-grow: 0;
      height: auto;
    }

    &__icon {
      width: var(--space-xl);
      height: var(--space-xl);
    }

    .selected-value {
      align-items: flex-end;
    }

    @include w-max($xl) {
      &__controls {
        flex-direction: column;
        gap: var(--space-xl);
      }

      &__filters {
        align-items: flex-start;
        width: 100%;
      }

      &__item {
        height: auto;
      }
    }

    @include w-max($md) {
      &__search {
        width: 100%;
      }
    }

    @include w-max($sm) {
      &__controls {
        flex-direction: column;
        gap: var(--space-xl);
      }

      &__filters {
        flex-flow: column nowrap;
        align-items: flex-start;
        width: 100%;
      }

      &__search,
      &__item {
        width: 100%;
      }
    }
  }
</style>
