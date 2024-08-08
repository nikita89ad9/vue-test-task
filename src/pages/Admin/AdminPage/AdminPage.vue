<template>
  <div class="admin-page">
    <div
      ref="panel"
      class="admin-page__panel"
    >
      <AdminPanel @amountPick="setElementsAmount" />
    </div>
    <BaseLayout
      class="table"
      :class="{ 'table--dashboard': route.name === 'AdminDashboard' }"
    >
      <RouterView #default="{ Component }">
        <Transition mode="out-in">
          <KeepAlive>
            <component
              :is="Component"
              :limit="elementsAmount.value"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { amountOptions } from '@pages/Admin/consts';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import AdminPanel from '../components/AdminPanel/AdminPanel.vue';

  const route = useRoute();

  const elementsAmount = ref<{ name: string; value: string }>(amountOptions[0]);

  const setElementsAmount = (amount: { name: string; value: string }) => {
    elementsAmount.value = amount;
  };

  const panel = ref<HTMLElement | null>(null);

  const panelHeight = computed<string>(() => panel.value?.clientHeight + 'px');
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .admin-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    @include w-max($md) {
      gap: var(--space-s);
    }
  }

  .table {
    height: calc(
      100vh - v-bind(panelHeight) - var(--header-height) - var(--space-3xl) * 2 - var(--space-xl)
    );

    &--dashboard {
      height: 100%;
    }
  }
</style>
