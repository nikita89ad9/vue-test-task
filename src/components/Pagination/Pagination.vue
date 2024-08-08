<template>
  <div class="pagination">
    <button
      :disabled="displayedPage === 1"
      class="pagination__control"
      @click="updatePage(displayedPage - 1)"
    >
      &#10094;
    </button>
    <button
      v-for="item in pageCount"
      :key="item"
      :class="['pagination__pages', { 'pagination__pages-active': displayedPage === item }]"
      @click="updatePage(item)"
    >
      {{ item }}
    </button>
    <button
      :disabled="displayedPage === pageCount"
      class="pagination__control"
      @click="updatePage(displayedPage + 1)"
    >
      &#10095;
    </button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    displayedPage: number;
    pageCount: number;
  }>();

  const emits = defineEmits<(e: 'updatePage', page: number) => void>();

  const updatePage = (pageNumber: number) => {
    emits('updatePage', pageNumber);
  };
</script>

<style scoped lang="scss">
  button {
    width: var(--space-4xl);
    height: var(--space-4xl);
    border-radius: 50%;
    background-color: var(--color-background-secondary);
    border: var(--border-light);
    font-size: var(--font-size-s);
    color: var(--color-font-primary);
    cursor: pointer;
    transition: var(--transition-default);
    font-family: var(--font-manrope-regular);

    @include w-max($md) {
      width: var(--space-2xl);
      height: var(--space-2xl);
    }

    @include w-max($sm) {
      width: var(--space-xl);
      height: var(--space-xl);
      font-size: var(--font-size-xs);
    }

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-font-light);
      border-color: var(--color-primary);
    }

    &:active {
      background-color: var(--color-primary-active);
      border-color: var(--color-primary-active);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--color-font-third);
      border-color: transparent;

      &:hover {
        background-color: var(--color-background-secondary);
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: var(--space-border-xs);
    width: 100%;
    justify-content: flex-end;

    &__pages-active {
      background-color: var(--color-primary);
      color: var(--color-font-light);
      border-color: var(--color-primary);
    }
  }
</style>
