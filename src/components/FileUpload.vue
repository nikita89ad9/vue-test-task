<template>
  <ImageUpload
    ref="imageupload"
    :currentImage="currentImage"
    @updateImageHeight="updateImageHeight"
    @updateImageWidth="updateImageWidth"
    @updateImageURL="updateImageUrl"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import ImageUpload from '@/components/ImageUpload.vue';
  import { UIUniqid } from '@utils/UIUniqid';
  import { getFilePath } from '@/utils/getFilePath';

  const props = defineProps<{
    initialValue: string | Blob;
  }>();

  const emit = defineEmits<(e: 'updateFile', value: File) => void>();

  const imageupload = ref<InstanceType<typeof ImageUpload> | null>(null);

  const parsedImage = computed(() => {
    if (props.initialValue !== '' && props.initialValue !== null) {
      return getFilePath(props.initialValue as string);
    } else return '';
  });

  const currentImage = ref(parsedImage.value as string);
  const imgWidth = ref<number>(0);
  const imgHeight = ref<number>(0);

  const updateImageHeight = (value: number) => {
    imgHeight.value = value;
  };

  const updateImageWidth = (value: number) => {
    imgWidth.value = value;
  };

  const updateImageUrl = async (value: string) => {
    currentImage.value = value;
    const originalImage = new Image();
    originalImage.crossOrigin = 'anonymous';
    originalImage.src = value;
    originalImage.onload = () => {
      imgWidth.value = originalImage.naturalWidth;
      imgHeight.value = originalImage.naturalHeight;
    };
    const file = await dataUrlToFile(currentImage.value);
    emit('updateFile', file);
  };

  const dataUrlToFile = async (dataUrl: string) => {
    let res = await fetch(dataUrl);
    const blob = await res.blob();
    const fileName = UIUniqid();
    return new File([blob], fileName, { type: 'image/png' });
  };
</script>
