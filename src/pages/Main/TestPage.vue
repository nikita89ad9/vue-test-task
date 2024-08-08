<template>
  <div class="responsive">Its responsive</div>
  <RecycleScroller
    #default="{ item }"
    class="scroller"
    :items="list"
    :itemSize="32"
    keyField="id"
    emitUpdate
  >
    <div class="user">
      {{ item }}
    </div>
  </RecycleScroller>
  <div>
    <button
      class="btn"
      @click="throwCustomError"
    >
      Add tag
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { catchError } from '@/utils/catchError';
  import { createCustomError } from '@/utils/createCustomError';

  const throwCustomError = () => {
    const error = createCustomError(500, 'Generic error');
    catchError(error);
  };
  const list = ref<number[]>(Array.from(Array(50).keys()));
</script>

<style lang="scss">
  .btn {
    padding: 10px;
    background: var(--color-primary);
    color: var(--color-font-light);
  }

  .scroller {
    height: 100px;
    overflow: scroll;
  }

  .user {
    height: 32%;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }
</style>
