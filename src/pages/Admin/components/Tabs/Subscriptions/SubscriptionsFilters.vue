<template>
  <div class="wrapper">
    <div class="filters">
      <BaseInput
        v-model="search"
        placeholder="Search"
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
    <BaseButton>
      {{ t('admin.tabs.buttons.subscription') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';

  const { t } = useI18n();

  const search = ref<string>('');
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
