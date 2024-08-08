<template>
  <Form class="form">
    <FormInput
      v-model="userModel.name"
      :placeholder="$t('admin.userUpdateForm.name')"
      variant="contained"
    />
    <FormInput
      v-model="userModel.surname"
      :placeholder="$t('admin.userUpdateForm.surname')"
      variant="contained"
    />
    <InputSelect
      v-if="departmentsOptions.length"
      v-model="selectedDepartment"
      :selectOptions="departmentsOptions"
      :triggerPlaceholder="$t('admin.userUpdateForm.department')"
    />
    <InputSelect
      v-if="jobTitlesOptions.length"
      v-model="selectedJobTitle"
      :selectOptions="jobTitlesOptions"
      :triggerPlaceholder="$t('admin.userUpdateForm.jobTitle')"
    />
    <InputSelect
      v-if="profLevelsOptions.length"
      v-model="selectedProfLevel"
      :selectOptions="profLevelsOptions"
      :triggerPlaceholder="$t('admin.userUpdateForm.professionalLevel')"
    />
    <FileUpload
      :initialValue="userModel.avatar"
      @updateFile="file => (userModel.avatar = file)"
    />
    <BaseButton
      class="form_submit"
      @click="submit"
    >
      {{ t('auth.submit') }}
    </BaseButton>
  </Form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FileUpload from '@/components/FileUpload.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import InputSelect from '@/components/InputSelect/InputSelect.vue';
  import type { IUserUpdateDTOReq } from '@/services/user/user.types';
  import type { SelectOption } from '@/types/Select';
  import type { UserUpdateModel } from '../types';

  const { t } = useI18n();

  const props = defineProps<{
    userModel: UserUpdateModel;
    userID: string;
    departmentsOptions: SelectOption[];
    initialDepartment: SelectOption;
    jobTitlesOptions: SelectOption[];
    initialJobTitle: SelectOption;
    profLevelsOptions: SelectOption[];
    initialProfLevel: SelectOption;
  }>();

  const userModel = ref(props.userModel);

  const selectedDepartment = ref(props.initialDepartment);
  const selectedJobTitle = ref(props.initialJobTitle);
  const selectedProfLevel = ref(props.initialProfLevel);

  const emit = defineEmits<(e: 'executeCallback', id: string, value: IUserUpdateDTOReq) => void>();

  const submit = () => {
    const formdata = new FormData();
    formdata.append('name', userModel.value.name);
    formdata.append('surname', userModel.value.surname);
    formdata.append('professionalLevel', selectedProfLevel.value.value);
    formdata.append('jobTitle', selectedJobTitle.value.value);
    formdata.append('department', selectedDepartment.value.value);
    formdata.append('avatar', userModel.value.avatar);
    emit('executeCallback', props.userID, userModel.value);
  };
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    &_submit {
      grid-column: 2;
    }

    :deep(.input) {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

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
