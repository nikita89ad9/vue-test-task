<template>
  <div class="profile-drafts">
    <BasePlaceholder :placeholderText="$t('profile.noDrafts')" />
  </div>
</template>

<script setup lang="ts">
  import BasePlaceholder from '@/components/common/BasePlaceholder/BasePlaceholder.vue';
</script>
