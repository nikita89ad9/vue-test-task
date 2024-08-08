<template>
  <div
    ref="player"
    class="player"
  >
    <iframe
      v-if="url"
      :src="url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="player__iframe"
    ></iframe>
    <div
      v-else
      class="player__placeholder"
    >
      {{ $t('meetups.videoError') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useElementSize } from '@vueuse/core';
  import { computed, ref } from 'vue';

  defineProps<{ url: string }>();

  const player = ref(null);

  const { width } = useElementSize(player);

  const height = computed(() => (width.value / 16) * 9 + 'px');
</script>

<style scoped lang="scss">
  .player {
    display: flex;
    align-items: center;
    justify-content: center;
    height: v-bind(height);
    max-height: 75vh;

    &__iframe {
      border-radius: var(--space-border-s);
      width: 100%;
      height: 100%;
    }

    &__placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: var(--color-background-secondary);
      border-radius: var(--space-border-s);
      line-height: 1.5;
      font-size: var(--font-size-l);
      color: var(--color-font-secondary);

      @include w-max($lg) {
        font-size: var(--font-size-s);
      }
    }
  }
</style>
