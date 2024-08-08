<template>
  <BaseLayout class="support">
    <h2>{{ t('techSupport.contactSupport') }}</h2>
    <div class="support__container">
      <div class="support__information">
        <Form>
          <div class="support__information__form">
            <FormInput
              v-model="topic"
              :placeholder="t('techSupport.placeholders.topic')"
            />
            <FormInput
              v-model="deadline"
              type="date"
            />
            <BaseModal :closeOnClickOutside="false">
              <template #trigger>
                <BaseButton>{{ t('techSupport.addPic') }}</BaseButton>
              </template>
              <template #modal="{ close }">
                <div class="imageupload">
                  <ImageUpload
                    :currentImage="file"
                    @updateImageURL="handleUploadImage"
                  >
                  </ImageUpload>
                  <div class="modal-actions">
                    <BaseButton
                      class="modal-actions--cancel"
                      @click="[close(), handleCancelImageAddition()]"
                    >
                      {{ t('techSupport.cancel') }}
                    </BaseButton>
                    <BaseButton
                      class="modal-actions--upload"
                      @click="close()"
                    >
                      {{ t('techSupport.upload') }}
                    </BaseButton>
                  </div>
                </div>
              </template>
            </BaseModal>
            <img
              v-if="file"
              :src="file"
              alt="Attached img"
              class="support__information__form--img"
            />
          </div>
        </Form>
      </div>
      <BaseTextArea
        v-model="msg"
        class="support__msg"
      />
      <div class="support__actions">
        <BaseModal :closeOnClickOutside="false">
          <template #trigger>
            <div class="support__actions--del">
              <IconWrapper :icon="icons.delete" />
            </div>
          </template>
          <template #modal="{ close }">
            <div class="action-modal">
              <div class="action-modal__text-content">
                <p>{{ t('techSupport.delMsg') }}</p>
                <p>{{ t('techSupport.continue') }}</p>
              </div>
              <div class="action-modal__actions">
                <BaseButton @click="close"> {{ t('techSupport.no') }} </BaseButton>
                <BaseButton @click="[close(), clearFields()]"
                  >{{ t('techSupport.yes') }}
                </BaseButton>
              </div>
            </div>
          </template>
        </BaseModal>
        <BaseButton @click="submitMessage">{{ t('techSupport.send') }}</BaseButton>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import BaseTextArea from '@/components/common/BaseTextArea/BaseTextArea.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import ImageUpload from '@/components/ImageUpload.vue';
  import { useSupportStore } from '@/stores/techSupport/store';
  import { icons } from '@/utils/icons';

  const { t } = useI18n();

  const { topic, deadline, file, msg } = storeToRefs(useSupportStore());
  const { clearFields, submitMessage } = useSupportStore();

  const handleUploadImage = (val: string) => {
    file.value = val;
  };

  const handleCancelImageAddition = () => {
    file.value = '';
  };
</script>

<style scoped lang="scss">
  .support {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: var(--space-xl);

    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      gap: var(--space-m);
    }

    h2 {
      font-size: var(--font-size-2xl);
      color: var(--color-font-primary);
      font-family: var(--font-manrope-semibold);
    }

    &__information {
      &__form {
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--space-l);

        &--img {
          width: 60px;
          height: 60px;

          @include w-max($sm) {
            display: none;
          }
        }

        @include w-max($lg) {
          flex-direction: column;
          align-items: start;
        }
      }
    }

    &__msg {
      height: 50vh;

      @include w-max($md) {
        height: 25vh;
      }
    }

    &__actions {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      &--del {
        padding: var(--space-2xs);
        border-radius: var(--space-border-s);
        border: var(--border-light);
        transition: var(--transition-default);

        :deep(path) {
          fill: var(--color-font-secondary);
        }

        &:hover {
          cursor: pointer;
          background-color: var(--color-background-icon);
        }
      }
    }
  }

  .modal-actions {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    &--upload {
      background-color: rgb(0 125 0);
    }
  }

  .action-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);

    &__text-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__actions {
      display: flex;
      flex-direction: row;
      width: 35%;
      align-items: center;
      justify-content: space-between;
    }
  }

  .imageupload {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 528px;
    position: relative;
  }
</style>
