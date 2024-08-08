<template>
  <BaseModal>
    <template #trigger>
      <button
        class="trigger"
        :title="$t('editor.options.image.add')"
      >
        <IconWrapper :icon="icons.editorIcons.image" />
      </button>
    </template>
    <template #modal="{ close }">
      <div class="imageupload">
        <ImageUpload
          ref="imageupload"
          :currentImage="currentImage"
          @updateImageHeight="updateImageHeight"
          @updateImageWidth="updateImageWidth"
          @updateImageURL="updateImageUrl"
        />
        <div class="imageupload__options imageupload-options">
          <BaseInput
            v-model.number="imgWidth"
            :placeholder="$t(`editor.options.image.width`)"
            class="imageupload-options__input"
            :label="$t(`editor.options.image.width`)"
            type="number"
            :min="0"
          />
          <BaseInput
            v-model.number="imgHeight"
            :placeholder="$t(`editor.options.image.height`)"
            class="imageupload-options__input"
            :label="$t(`editor.options.image.height`)"
            type="number"
            :min="0"
          />
        </div>
        <BaseButton
          class="imageupload__submit"
          @click="submitImage(currentImage, close)"
        >
          {{ $t(`editor.options.image.submit`) }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import type { Editor } from '@tiptap/vue-3';

  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';

  import IconWrapper from '@/components/IconWrapper.vue';
  import ImageUpload from '@/components/ImageUpload.vue';
  import { icons } from '@/utils/icons';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import BaseModal from '../common/BaseModal.vue';

  const { t } = useI18n();

  const toast = useToast();

  const props = defineProps<{
    editor: Editor | undefined;
  }>();

  const imageupload = ref<InstanceType<typeof ImageUpload> | null>(null);
  const currentImage = ref<string>('');
  const imgWidth = ref<number>(0);
  const imgHeight = ref<number>(0);

  const updateImageHeight = (value: number) => {
    imgHeight.value = value;
  };

  const updateImageWidth = (value: number) => {
    imgWidth.value = value;
  };

  const updateImageUrl = (value: string) => {
    currentImage.value = value;
    const originalImage = new Image();
    originalImage.crossOrigin = 'anonymous';
    originalImage.src = value;
    originalImage.onload = () => {
      imgWidth.value = originalImage.naturalWidth;
      imgHeight.value = originalImage.naturalHeight;
    };
  };

  const submitImage = async (url: string, callback: () => void): Promise<void> => {
    if (currentImage.value) {
      const newUrl = await resizeImage(url, imgWidth.value, imgHeight.value);
      props.editor?.chain().setImage({ src: newUrl }).run();
      callback();
      imageupload.value?.clearImageInput();
      toast.success(t(`editor.options.image.successInput`));
    } else {
      toast.error(t(`editor.options.image.errInput`));
    }
  };

  const resizeImage = (imagePath: string, newWidth: number, newHeight: number): Promise<string> => {
    return new Promise<string>(resolve => {
      const originalImage = new Image();
      originalImage.src = imagePath;
      originalImage.crossOrigin = 'anonymous';
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      originalImage.onload = () => {
        const originalWidth = originalImage.naturalWidth;
        const originalHeight = originalImage.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;

        if (newHeight === undefined) {
          newHeight = newWidth / aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        if (ctx) {
          ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
        }

        let resizedImage = '';

        if (imagePath.includes('data:image/')) {
          const imgType = imagePath.substring('data:image/'.length, imagePath.indexOf(';base64'));
          resizedImage = canvas.toDataURL(`image/${imgType}`, 1);
        } else {
          resizedImage = canvas.toDataURL();
        }

        resolve(resizedImage);
      };
    });
  };
</script>

<style lang="scss">
  .imageupload {
    .imageupload__input,
    .imageupload-options__input {
      .input__wrapper {
        .input__field {
          font-size: var(--font-size-xs);
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  .trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-5xl);
    height: var(--space-5xl);
    background: transparent;
    border-radius: var(--space-border-xs);
    outline: none;
    transition: 0.2s all;

    :deep(path) {
      fill: var(--color-font-primary);
    }

    &:hover,
    &_active {
      background: var(--color-third);
      filter: brightness(1.4);
    }

    &_disabled {
      opacity: 0.5;

      &:hover {
        background: transparent;
      }
    }

    &__icon {
      width: var(--space-xl);
      height: var(--space-xl);
      margin-left: var(--space-xs);
      margin-right: var(--space-xs);
    }
  }

  .imageupload {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 528px;
    position: relative;

    &__input {
      width: 100%;
      margin-bottom: var(--space-3xl);
    }

    &__placeholder {
      display: flex;
      line-height: 1.5;
    }

    &__submit {
      margin-top: var(--space-s);
    }
  }

  .imageupload-options {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-3xl);

    &__input {
      width: 100%;
    }
  }
</style>
