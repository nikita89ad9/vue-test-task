<template>
  <div class="wrapper">
    <div class="filters">
      <BaseInput
        v-model="search"
        :placeholder="$t('general.search')"
        @update:modelValue="value => emit('updateSearch', value)"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
        <template #append-icon="{ clear }">
          <IconWrapper
            :icon="icons.close"
            class="filters__close"
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <BaseModal>
      <template #trigger>
        <BaseButton>
          {{ t('admin.tabs.buttons.user') }}
        </BaseButton>
      </template>
      <template #modal="{ close }">
        <UserCreateForm
          :users="users"
          :departmentsOptions="departmentsOptions"
          :initialDepartment="initialDepartment"
          :jobTitlesOptions="jobTitlesOptions"
          :initialJobTitle="initialJobTitle"
          :profLevelsOptions="profLevelsOptions"
          :initialProfLevel="initialProfLevel"
          :userModel="userModel"
          @createUser="
            (data: IUserCreateDTOReq) => {
              createUser(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useAdminUserStore } from '@/stores/admin/usersStore/usersStore';
  import type { IUserCreateDTOReq } from '@/services/user/user.types';
  import type { IUserDTO } from '@/services/user/user.types';
  import { icons } from '@/utils/icons';
  import type { SelectOption } from '@/types/Select';
  import type { UserModel } from './types';
  import UserCreateForm from './components/UserCreateForm.vue';

  defineProps<{
    users: IUserDTO[];
    departmentsOptions: SelectOption[];
    initialDepartment: SelectOption;
    jobTitlesOptions: SelectOption[];
    initialJobTitle: SelectOption;
    profLevelsOptions: SelectOption[];
    initialProfLevel: SelectOption;
  }>();

  const emit = defineEmits<(e: 'updateSearch', value: string) => void>();

  const { t } = useI18n();
  const { createUser } = useAdminUserStore();

  const search = ref<string>('');

  const userModel = ref<UserModel>({
    name: '',
    surname: '',
    email: '',
    department: '',
    password: '',
  });
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filters {
      display: flex;
      align-items: center;
      gap: var(--space-m);
      margin-right: var(--space-m);

      &__clear {
        width: var(--space-m);
        height: var(--space-m);
      }

      @include w-max($sm) {
        overflow-x: auto;
      }
    }
  }
</style>
