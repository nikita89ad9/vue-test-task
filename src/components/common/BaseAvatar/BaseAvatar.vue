<template>
  <img
    :src="src || '/avatarSample.png'"
    alt="avatar"
    @error="e => setAltImg(e, '/avatarSample.png')"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { setAltImg } from '@/utils/setAltImage';

  const props = withDefaults(
    defineProps<{
      src?: string;
      size?: string;
    }>(),
    {
      size: '50',
    }
  );

  const avatarSize = computed<string>(() => props.size + 'px');
</script>

<style scoped lang="scss">
  img {
    width: v-bind(avatarSize);
    height: v-bind(avatarSize);
    border-radius: 50%;
  }
</style>
