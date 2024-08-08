<template>
  <Form class="form">
    <FormInput
      v-for="item in localProfileData"
      :key="item.placeholder"
      v-model="item.model"
      :placeholder="item.placeholder"
      :label="item.placeholder"
      class="form_input"
    >
      <template #append-icon="{ reset }">
        <IconWrapper
          :icon="icons.close"
          class="icon"
          @click="reset"
        />
      </template>
    </FormInput>
    <BaseButton
      class="form_submit"
      @click="submit"
    >
      {{ t('auth.submit') }}
    </BaseButton>
  </Form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import type { IUserUpdateDTOReq } from '@/services/user/user.types';
  import { icons } from '@/utils/icons';
  import type { ProfileUpdateForm } from '../../types';

  const props = defineProps<{
    profileData: IUserUpdateDTOReq;
    formBuildCallback: (props: IUserUpdateDTOReq) => ProfileUpdateForm[];
  }>();
  const emits = defineEmits<{
    updateProfileData: [data: IUserUpdateDTOReq];
  }>();

  const { t } = useI18n();

  const localProfileData = ref<ProfileUpdateForm[]>(props.formBuildCallback(props.profileData));

  const modelData = computed<IUserUpdateDTOReq>(() => {
    return localProfileData.value.reduce(
      (result, item: ProfileUpdateForm) => {
        result[item.modelKey] = item.model;
        return result;
      },
      {} as { [key: string]: string | undefined }
    ) as unknown as IUserUpdateDTOReq;
  });

  const submit = () => {
    emits('updateProfileData', modelData.value);
  };
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
    padding-top: var(--space-2xl);

    .icon {
      width: var(--space-m);
      height: var(--space-m);

      :deep(path) {
        fill: var(--color-font-secondary);
        cursor: pointer;
        transition: var(--transition-default);
      }

      &:hover {
        :deep(path) {
          fill: var(--color-font-primary);
        }
      }
    }
  }
</style>
