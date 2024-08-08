<template>
  <div class="imageupload__wrapper">
    <div
      v-if="currentImage"
      class="imageupload__delete"
      :title="$t(`editor.options.image.delete`)"
      @click="clearImageInput"
    >
      <IconWrapper
        :icon="icons.close"
        class="imageupload__icon"
      />
    </div>
    <input
      id="imageupload"
      ref="fileupload"
      accept="image/*"
      type="file"
      placeholder="Upload file"
      class="imageupload__file"
      @change="onImageUpload($event)"
    />
    <label
      id="drop_zone"
      for="imageupload"
      class="imageupload__label"
      @drop="dropHandler($event)"
      @dragover="dragOverHandler($event)"
    >
      <div
        v-if="currentImage"
        class="imageupload__preview imageupload-preview"
      >
        <img
          :src="currentImage"
          class="imageupload-preview__image"
        />
        <span class="imageupload-preview__overlay">{{
          $t(`editor.options.image.placeholder`)
        }}</span>
      </div>
      <span
        v-else
        class="imageupload__placeholder"
      >
        {{ $t(`editor.options.image.placeholder`) }}
      </span>
    </label>
    <BaseInput
      :modelValue="concattedImageUrl"
      :placeholder="$t(`editor.options.image.input`)"
      class="imageupload__input"
      variant="contained"
      @update:modelValue="$emit('updateImageURL', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';

  import { icons } from '@/utils/icons';
  import IconWrapper from './IconWrapper.vue';
  import BaseInput from './common/BaseInput/BaseInput.vue';

  const { t } = useI18n();

  const toast = useToast();

  const fileupload = ref<HTMLInputElement | null>(null);
  const encodedImage = ref<string>('');

  const props = defineProps<{
    currentImage: string;
  }>();

  const emit = defineEmits<{
    (e: 'updateImageHeight', value: number): void;
    (e: 'updateImageWidth', value: number): void;
    (e: 'updateImageURL', value: string): void;
  }>();

  const { currentImage } = toRefs(props);

  const concattedImageUrl = computed(() => {
    if (currentImage.value.includes('data:image/')) {
      return currentImage.value.slice(0, 100);
    } else {
      return currentImage.value;
    }
  });

  const clearImageInput = (): void => {
    (fileupload.value as HTMLInputElement).value = '';
    encodedImage.value = '';
    emit('updateImageURL', encodedImage.value);
    emit('updateImageHeight', 0);
    emit('updateImageWidth', 0);
  };

  const onImageUpload = async ($event: Event): Promise<void> => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      encodedImage.value = (await toBase64(target.files[0])) as string;
      const { width, height } = await getImageSize(encodedImage.value);
      emit('updateImageURL', encodedImage.value);
      emit('updateImageHeight', height);
      emit('updateImageWidth', width);
    }
  };

  const getImageSize = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise<{ width: number; height: number }>(resolve => {
      const img: HTMLImageElement = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
    });
  };

  const toBase64 = (fileInput: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const dropHandler = (ev: DragEvent): void => {
    ev.preventDefault();

    if (ev.dataTransfer?.items) {
      [...ev.dataTransfer.items].forEach(async item => {
        if (item.kind === 'file' && item.type.split('/')[0] === 'image') {
          const file = item.getAsFile() as File;
          encodedImage.value = (await toBase64(file)) as string;
          const { width, height } = await getImageSize(encodedImage.value);
          emit('updateImageURL', encodedImage.value);
          emit('updateImageHeight', height);
          emit('updateImageWidth', width);
        } else if (item.kind === 'file' && item.type.split('/')[0] !== 'image') {
          toast.error(t(`editor.options.image.errType`));
        }
      });
    }
  };

  const dragOverHandler = (ev: DragEvent): void => {
    ev.preventDefault();
  };

  defineExpose({
    clearImageInput,
  });
</script>

<style scoped lang="scss">
  .imageupload__wrapper {
    position: relative;
  }

  .imageupload-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

    &:hover {
      background: var(--color-background-icon);
    }

    &-active {
      background: var(--color-background-icon);
    }

    &__icon {
      width: var(--space-xl);
      height: var(--space-xl);
      margin-left: var(--space-xs);
      margin-right: var(--space-xs);
    }
  }

  .imageupload {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;

    &__delete {
      position: absolute;
      top: calc(var(--space-s) * -1);
      right: calc(var(--space-s) * -1);
      padding: var(--space-xs);
      border-radius: 50%;
      background: var(--color-primary);
      cursor: pointer;
      z-index: 2;
    }

    &__icon {
      width: var(--space-s);
      height: var(--space-s);

      :deep(path) {
        fill: var(--color-font-light);
      }
    }

    &__file {
      display: none;
    }

    &__input {
      width: 100%;
      margin-bottom: var(--space-3xl);
    }

    &__label {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 270px;
      width: 480px;
      padding: var(--space-xl);
      border: 1px dashed var(--color-third);
      text-align: center;
      font-size: var(--font-size-xs);
      color: var(--color-font-secondary);
      margin-bottom: var(--space-xs);
      overflow: hidden;
      cursor: pointer;
    }

    &__placeholder {
      display: flex;
      line-height: 1.5;
    }

    &__submit {
      margin-top: var(--space-s);
    }

    @include w-max($md) {
      &__label {
        width: 240px;
        height: 135px;
      }
    }
  }

  .imageupload-preview {
    width: 100%;
    height: 100%;
    position: relative;

    &__image {
      width: auto;
      height: 100%;
      object-fit: cover;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-black-overlay);
      color: var(--color-font-light);
      transition: var(--transition-default);
      opacity: 0;
      line-height: 1.5;
      padding: var(--space-xs);
      z-index: 2;
    }

    &:hover {
      .imageupload-preview__overlay {
        opacity: 1;
      }
    }
  }
</style>
