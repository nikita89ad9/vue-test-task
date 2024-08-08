<template>
  <BaseDropdown toggleOnHover>
    <template #trigger>
      <Tile class="tile">
        {{ item }}
      </Tile>
    </template>
    <template #content>
      <div class="section">
        <div class="section__logo">
          <img src="/article-preview.png" />
        </div>
        <div class="section__content section-content">
          <div class="section-content__top">
            <div class="section-content__header">
              <div class="section-content__header--name">Lorem ipsum</div>
            </div>
            <div class="section-content__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div class="section-content__info section-info">
            <p>{{ $t('general.articles') }}: <span class="section-info__number">23</span></p>
            <p>{{ $t('general.subscribers') }}: <span class="section-info__number">23</span></p>
          </div>
          <BaseButton>{{ $t('general.unsubscribe') }}</BaseButton>
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import Tile from '@components/Tile/Tile.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';

  defineProps<{
    item: string;
  }>();
</script>

<style scoped lang="scss">
  .tile {
    @include w-max($xs) {
      width: 100%;
      gap: auto;
      justify-content: space-between;
    }
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    padding: var(--space-m);
    border: var(--border-light);
    border-radius: var(--space-border-s);
    transition: var(--transition-default);
    width: 400px;
    cursor: pointer;

    &__logo {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-shrink: 0;
      width: 60px;
      height: 60px;

      :deep(img) {
        width: 100%;
        height: auto;
        display: block;
      }

      @include w-max($sm) {
        display: none;
      }
    }

    &-content {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-m);

      &__header {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-2xs);

        &--name {
          font-family: var(--font-manrope-semibold);
          font-size: var(--font-size-m);
          color: var(--color-font-primary);
        }
      }

      &__description {
        font-size: var(--font-size-xs);
        color: var(--color-font-secondary);
        line-height: 1.5;
      }
    }

    &-info {
      font-family: var(--font-manrope-regular);
      font-size: var(--font-size-xs);
      color: var(--color-font-secondary);
      display: flex;
      flex-direction: row;
      gap: var(--space-m);
      text-wrap: nowrap;

      @include w-max($sm) {
        display: none;
      }

      &__number {
        font-weight: 600;
      }
    }

    @include w-max($sm) {
      &__content {
        &__description {
          font-size: var(--font-size-xs);
        }
      }
    }
  }
</style>
