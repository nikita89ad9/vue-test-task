<template>
  <BaseModal>
    <template #trigger>
      <button
        :class="['trigger']"
        :title="$t('editor.options.video.add')"
      >
        <IconWrapper
          :icon="icons.editorIcons.youtube"
          class="video-trigger__icon"
        />
      </button>
    </template>
    <template #modal="{ close }">
      <div class="video">
        <div class="video__preview">
          <iframe
            v-if="currentVideo"
            :src="currentVideoPreview"
            width="426"
            height="240"
          ></iframe>
          <div v-else>
            <img src="/video-placeholder.jpg" />
          </div>
        </div>
        <div class="video__options video-options">
          <BaseInput
            v-model="currentVideo"
            :placeholder="$t(`editor.options.video.input`)"
            class="video-options__input video-options__link"
          >
            <template #append-icon>
              <div
                v-if="currentVideo"
                class="video-options__clear"
                @click="resetVideoUrl"
              >
                <IconWrapper
                  class="video-options__icon"
                  :icon="icons.close"
                />
              </div>
            </template>
          </BaseInput>
          <BaseInput
            :modelValue="videoWidth"
            :placeholder="$t(`editor.options.video.width`)"
            :label="$t(`editor.options.video.width`)"
            class="video-options__input"
            type="number"
            @update:modelValue="updateVideoWidth($event)"
          />
          <BaseInput
            :modelValue="videoHeight"
            :min="0"
            :placeholder="$t(`editor.options.video.height`)"
            :label="$t(`editor.options.video.height`)"
            class="video-options__input"
            type="number"
            @update:modelValue="updateVideoHeight($event)"
          />
          <div class="">
            <BaseCheckbox
              :modelValue="preserveRatio"
              :min="0"
              name="aspect-ratio"
              class="right"
              @update:modelValue="toPreserveAspectRatio"
            >
              {{ $t(`editor.options.video.aspectRatio`) }}
            </BaseCheckbox>
          </div>
        </div>
        <BaseButton
          class="video__submit"
          @click="submitVideo(close)"
        >
          {{ $t(`editor.options.video.submit`) }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import type { Editor } from '@tiptap/vue-3';

  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';

  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';
  import BaseButton from '../common/BaseButton/BaseButton.vue';
  import BaseCheckbox from '../common/BaseCheckbox/BaseCheckbox.vue';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import BaseModal from '../common/BaseModal.vue';

  const { t } = useI18n();

  const toast = useToast();

  const props = defineProps<{
    editor: Editor | undefined;
  }>();

  const currentVideo = ref<string>('');

  const isLinkValid = computed<string | false>(() => {
    const p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = currentVideo.value.match(p);
    return matches ? matches[1] : false;
  });

  const currentVideoPreview = computed<string>(() =>
    isLinkValid.value ? `https://www.youtube.com/embed/${isLinkValid.value}` : ''
  );

  const videoWidth = ref<number>(640);
  const videoHeight = ref<number>(360);
  const preserveRatio = ref<boolean>(true);

  const toPreserveAspectRatio = (value: boolean) => {
    preserveRatio.value = value;
  };

  const updateVideoWidth = (width: string) => {
    videoWidth.value = Number(width);
    if (preserveRatio.value) {
      videoHeight.value = Math.ceil((videoWidth.value / 16) * 9);
    }
  };

  const updateVideoHeight = (height: string) => {
    videoHeight.value = Number(height);
    if (preserveRatio.value) {
      videoWidth.value = Math.ceil((videoHeight.value / 9) * 16);
    }
  };

  const submitVideo = async (callback: () => void): Promise<void> => {
    if (isLinkValid.value) {
      props.editor?.commands.setYoutubeVideo({
        src: currentVideo.value,
        width: videoWidth.value,
        height: videoHeight.value,
      });
      callback();
      toast.success(t(`editor.options.video.successInput`));
      resetVideoUrl();
    } else {
      toast.error(t(`editor.options.video.errInput`));
    }
  };

  const resetVideoUrl = () => {
    currentVideo.value = '';
  };
</script>

<style lang="scss">
  .video {
    .video__input,
    .video-options__input {
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

  .video {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 426px;
    position: relative;

    &__preview {
      margin-bottom: var(--space-s);

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__placeholder {
      display: flex;
      line-height: 1.5;
    }

    &__submit {
      margin-top: var(--space-s);
    }
  }

  .video-options {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-3xl);

    &__input {
      width: 100%;
    }

    &__clear {
      background: var(--color-extra-light);
      height: var(--space-l);
      width: var(--space-l);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
    }

    &__icon {
      height: var(--space-xs);
      width: var(--space-xs);

      :deep(path) {
        fill: var(--color-font-primary);
      }
    }
  }
</style>
