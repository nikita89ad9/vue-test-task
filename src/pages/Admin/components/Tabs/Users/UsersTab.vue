<template>
  <div class="tab">
    <div class="tab__content">
      <div class="tab__table">
        <UserFilters
          :departmentsOptions="departmentsOptions"
          :initialDepartment="initialDepartment"
          :jobTitlesOptions="jobTitlesOptions"
          :initialJobTitle="initialJobTitle"
          :profLevelsOptions="profLevelsOptions"
          :initialProfLevel="initialProfLevel"
          :users="usersList"
          @updateSearch="value => (search = value)"
        />
        <DataTable
          v-if="usersListCount > 0"
          v-model="model"
          :headers="tableHeadersUsers"
          :data="usersList"
          :sortOrder="sortOrder"
          :sortValue="sortVal"
          :menuItems="menuItems"
          markAsSelected
          @deleteItem="
            (itemData: IUser) => {
              deleteUser(itemData.id);
            }
          "
          @editItem="(itemData: IUser) => editUser(itemData)"
          @routePush="router.push({ name: 'Profile', params: { profileID: $event } })"
        />
        <div
          v-else
          class="tab__placeholder"
        >
          {{ $t('general.notFound') }}
        </div>
      </div>
      <Pagination
        v-if="pageCount !== 0"
        :displayedPage="filters.page + 1"
        :pageCount="pageCount"
        @updatePage="newPage => (page = newPage - 1)"
      />
    </div>
    <BaseModal ref="modal">
      <template #modal="{ close }">
        <UserUpdateForm
          :userID="userID"
          :users="usersList"
          :userModel="userModel"
          :departmentsOptions="departmentsOptions"
          :initialDepartment="initialDepartment"
          :jobTitlesOptions="jobTitlesOptions"
          :initialJobTitle="initialJobTitle"
          :profLevelsOptions="profLevelsOptions"
          :initialProfLevel="initialProfLevel"
          @executeCallback="
            (id: string, data: IUserUpdateDTOReq) => {
              updateUser(id, data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, reactive, ref, watch } from 'vue';

  import Pagination from '@components/Pagination/Pagination.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import DataTable from '@/components/DataTable/DataTable.vue';
  import { useAdminUserStore } from '@stores/admin/usersStore/usersStore';
  import type { IUser } from '@/stores/admin/usersStore/model';
  import { useDepartmentsStore } from '@/stores/departments/store';
  import { useJobTitlesStore } from '@/stores/jobTitlesStore/store';
  import { useProfessionalLevelsStore } from '@/stores/professionalLevelsStore/store';
  import { useAdminHeaderMenu } from '@/composables/useAdminHeaderMenu';
  import { useAdminTable } from '@/composables/useAdminTable';
  import type { IUserUpdateDTOReq } from '@/services/user/user.types';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import router from '@/router';
  import type { UserUpdateModel } from './types';
  import UserFilters from './UserFilters.vue';
  import UserUpdateForm from './components/UserUpdateForm.vue';

  const props = defineProps<{
    limit: string;
  }>();

  const { usersList, usersListCount } = storeToRefs(useAdminUserStore());
  const { getUsers, deleteUser, updateUser } = useAdminUserStore();

  const { departments } = storeToRefs(useDepartmentsStore());
  const { getDepartments } = useDepartmentsStore();

  const { jobTitles } = storeToRefs(useJobTitlesStore());
  const { getJobTitles } = useJobTitlesStore();

  const { professionalLevels } = storeToRefs(useProfessionalLevelsStore());
  const { getProfessionalLevels } = useProfessionalLevelsStore();

  const { tableHeadersUsers } = useAdminTable();

  const model = ref([]);
  const sortVal = ref('');
  const sortOrder = ref(false);

  const modal = ref<InstanceType<typeof BaseModal> | null>(null);

  const userModel = reactive<UserUpdateModel>({
    name: '',
    surname: '',
    department: '',
    professionalLevel: '',
    jobTitle: '',
    avatar: '',
  });

  const userID = ref<string>('');

  const editUser = (data: IUser) => {
    userID.value = data.id;
    userModel.name = data.name;
    userModel.surname = data.surname;
    userModel.department = data.department;
    userModel.professionalLevel = data.professionalLevel;
    userModel.jobTitle = data.jobTitle;
    userModel.avatar = data.avatar?.mediaUrl as string;
    modal.value?.toggleModalStatus();
  };

  const departmentsOptions = computed(() => {
    if (departments) {
      return departments.value.map(department => {
        return { name: department.name, value: department.name };
      });
    } else return [];
  });

  const initialDepartment = computed(() => {
    return { name: userModel.department, value: userModel.department };
  });

  const jobTitlesOptions = computed(() => {
    if (jobTitles) {
      return jobTitles.value.map(jobTitle => {
        return { name: jobTitle.name, value: jobTitle.name };
      });
    } else return [];
  });

  const initialJobTitle = computed(() => {
    return { name: userModel.jobTitle, value: userModel.jobTitle };
  });

  const profLevelsOptions = computed(() => {
    if (professionalLevels) {
      return professionalLevels.value.map(profLevel => {
        return { name: profLevel.name, value: profLevel.name };
      });
    } else return [];
  });

  const initialProfLevel = computed(() => {
    return { name: userModel.professionalLevel, value: userModel.professionalLevel };
  });

  const { menuItems } = useAdminHeaderMenu(editUser, deleteUser);

  const search = ref<string>('');
  const page = ref<number>(0);

  const pageCount = computed(() => Math.ceil(usersListCount.value / Number(props.limit)));

  const filters = computed(() => {
    return {
      limit: props.limit,
      search: search.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: '-createdAt',
    };
  });

  watch(filters, () => {
    getUsers(filters.value);
  });

  onMounted(() => {
    getUsers(filters.value);
    getDepartments();
    getJobTitles();
    getProfessionalLevels();
  });
</script>

<style lang="scss" scoped>
  .tab {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__table {
      height: calc(100% - var(--space-4xl) - var(--space-m));
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &__content {
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size-m);
      color: var(--color-font-secondary);
    }
  }
</style>
