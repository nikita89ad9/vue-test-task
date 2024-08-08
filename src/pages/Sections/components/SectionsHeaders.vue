<template>
  <div class="headers">
    <div class="header__item headers-item">
      <h2 class="headers-item__title">{{ t('sections.sections') }}</h2>
      <BaseInput
        :modelValue="searchVal"
        :placeholder="t('articles.placeholders.search')"
        class="header-item__input"
        @update:modelValue="value => emit('updateSearch', value)"
      >
        <template #prepend-icon
          ><IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
        <template #append-icon="{ clear }">
          <IconWrapper
            :icon="icons.close"
            class="headers-item__input_clear"
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <div class="headers__item headers-item">
      <div
        class="headers-item__label"
        @click="changeSort(name)"
      >
        <p>{{ t('sections.name') }}</p>
        <IconWrapper
          :icon="icons.chevronUp"
          class="headers-item__icon"
          :class="{
            'headers-item__icon--reversed': sortOrder === '-' && sortVal.name === 'name',
            'headers-item__icon--active': sortVal.name === 'name',
          }"
        />
      </div>
      <div class="headers-item--right-side">
        <div
          class="headers-item__label"
          @click="changeSort(articles)"
        >
          <p>{{ t('sections.articles') }}</p>
          <IconWrapper
            :icon="icons.chevronUp"
            class="headers-item__icon"
            :class="{
              'headers-item__icon--reversed': sortOrder === '-' && sortVal.name === 'articles',
              'headers-item__icon--active': sortVal.name === 'articles',
            }"
          />
        </div>
        <div
          class="headers-item__label"
          @click="changeSort(subscribers)"
        >
          <p>{{ t('sections.subscribers') }}</p>
          <IconWrapper
            :icon="icons.chevronUp"
            class="headers-item__icon"
            :class="{
              'headers-item__icon--reversed': sortOrder === '-' && sortVal.name === 'subscribers',
              'headers-item__icon--active': sortVal.name === 'subscribers',
            }"
          />
        </div>
      </div>
      <Select
        :modelValue="sortVal"
        :options="sortOptions"
        :placeholder="$t('sections.sortedBy')"
        class="headers-item__select"
        @update:modelValue="value => changeSort(value)"
      >
        <span>
          {{ $t('sections.sortedBy') }}:
          {{ displayValue }}
        </span>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import Select from '@/components/Select/Select.vue';
  import { icons } from '@/utils/icons';

  const props = defineProps<{
    sortOptions: { name: string; value: string }[];
    searchVal: string;
    sortVal: { name: string; value: string };
    sortOrder: string;
  }>();

  const emit = defineEmits<{
    (e: 'updateSearch', value: string): void;
    (e: 'updateSort', value: { name: string; value: string }, order: string): void;
  }>();

  const { t } = useI18n();

  const articles = { name: t('sections.sortOptions.articles'), value: 'articles' };
  const name = { name: t('sections.sortOptions.name'), value: 'name' };
  const subscribers = { name: t('sections.sortOptions.subscribers'), value: 'subscribers' };

  const displayValue = computed(() => {
    const current = props.sortOptions.find(item => item.value === props.sortVal.value);
    return current?.name;
  });

  const changeSort = (val: { name: string; value: string }) => {
    const order = props.sortOrder === '' ? '-' : '';
    emit('updateSort', val, order);
  };
</script>

<style scoped lang="scss">
  .headers {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: var(--color-background-primary);
    border-radius: var(--space-border-s);
    box-shadow: var(--shadow-container);

    &-item {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-m);
      padding: var(--space-xl);
      font-size: var(--font-size-xl);
      font-family: var(--font-manrope-semibold);
      color: var(--color-font-primary);

      &:first-child {
        border-bottom: var(--border-light);
      }

      &:last-child {
        font-size: var(--font-size-m);
        font-family: var(--font-manrope-regular);
      }

      &__input {
        &_clear {
          width: var(--space-m);
          height: var(--space-m);
        }
      }

      &__label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: var(--space-xs);
        min-height: 25px;
        width: 115px;
        cursor: pointer;
        font-size: var(--font-size-s);
      }

      &__icon {
        display: flex;
        flex-shrink: 0;
        transition: var(--transition-default);
        opacity: 0.3;
        width: var(--space-l);
        height: var(--space-l);

        &--reversed {
          transform: rotate(180deg);
        }

        &--active {
          opacity: 1;
        }
      }

      &--right-side {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-xl);

        .headers__item__label {
          justify-content: flex-end;
        }
      }

      &__select {
        display: none;
        font-size: var(--font-size-s);
        cursor: pointer;
      }

      @include w-max($lg) {
        &__title {
          font-size: var(--space-xl);
        }

        &__select {
          display: flex;
        }

        &__label {
          display: none;
        }
      }
    }

    @include w-max($sm) {
      &__item:first-child {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-xs);
      }
    }
  }
</style>
