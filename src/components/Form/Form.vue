<template>
  <form
    class="form"
    @submit.prevent
  >
    <slot :valid="isValid"></slot>
  </form>
</template>

<script setup lang="ts">
  import { useCreateForm } from '@composables/form/useCreateForm';
  import { provideForm } from '@composables/form/useProvideForm';

  const { create, isValid } = useCreateForm();

  provideForm(create);
</script>
