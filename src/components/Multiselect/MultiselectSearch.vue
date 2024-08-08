<template>
  <div class="multiselect__search">
    <BaseInput
      :modelValue="value"
      variant="contained"
      placeholder="Search"
      @update:modelValue="value => emit('updateSearchValue', value)"
    >
      <template #prepend-icon>
        <IconWrapper
          :icon="icons.search"
          regular
          class="multiselect__search--icon"
        />
      </template>
    </BaseInput>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import IconWrapper from '@components/IconWrapper.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import { icons } from '@/utils/icons';

  const props = defineProps<{
    searchValue: string;
  }>();

  const emit = defineEmits<(e: 'updateSearchValue', value: string) => void>();

  const value = ref(props.searchValue);
</script>

<style scoped lang="scss">
  .multiselect__search {
    padding: var(--space-m);

    &--icon {
      width: var(--space-xl);
      height: var(--space-xl);
    }
  }
</style>
