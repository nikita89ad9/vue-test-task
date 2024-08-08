<template>
  <div>
    {{ meetupId }}
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const meetupId = route.params.meetupId;
</script>
