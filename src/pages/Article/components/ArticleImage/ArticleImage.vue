<template>
  <div class="preview">
    <img
      :src="data.src"
      :alt="data.description"
      class="preview__image"
      @error="e => setAltImg(e, '/preview-placeholder.jpg')"
    />
    <span
      v-if="data.description"
      class="preview__description"
    >
      {{ data.description }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { setAltImg } from '@/utils/setAltImage';

  const props = defineProps<{
    data: {
      src: string;
      description: string;
    };
  }>();

  const data = computed(() => props.data);
</script>

<style scoped lang="scss">
  .preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-s);

    &__image {
      width: 100%;
    }

    &__description {
      font-size: var(--font-size-xs);
      color: var(--color-font-secondary);
    }
  }
</style>
