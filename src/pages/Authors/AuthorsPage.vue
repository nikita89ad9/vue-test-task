<template>
  <NavigationPanel
    :modelValue="authorsModel"
    :jobsArr="jobsArr"
    :departmentsArr="departmentsArr"
    :searchValue="searchValue"
    :sortValue="sortValue"
    :sortOptions="sortOptions"
    :itemsVisible="itemsVisible"
    :itemsTotal="usersListCount"
    @updateSearch="value => (searchValue = value)"
    @updateSort="value => (sortValue = value)"
  />
  <div
    v-if="usersList.length"
    class="authors"
  >
    <div class="authors__grid">
      <AuthorsCard
        v-for="item in usersList"
        :key="item.id"
        :author="item"
      />
    </div>

    <Pagination
      v-if="pageCount !== 0"
      :displayedPage="filters.page + 1"
      :pageCount="pageCount"
      @updatePage="newPage => (page = newPage - 1)"
    />
  </div>
  <BasePlaceholder
    v-else
    :placeholderText="$t('authors.noResults')"
  />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BasePlaceholder from '@components/common/BasePlaceholder/BasePlaceholder.vue';
  import type { IMultiselectOptionProps } from '@/components/Multiselect/types';
  import Pagination from '@/components/Pagination/Pagination.vue';
  import { useAdminUserStore } from '@/stores/admin/usersStore/usersStore';
  import { useSectionsStore } from '@/stores/sectionsStore/store';
  import { getCurrentPage } from '@/utils/getCurrentPage';
  import type { ISelectValue } from './types';
  import AuthorsCard from './components/AuthorsCard.vue';
  import NavigationPanel from './components/NavigationPanel.vue';

  const { usersList, usersListCount } = storeToRefs(useAdminUserStore());
  const { getUsers } = useAdminUserStore();

  const { sections } = storeToRefs(useSectionsStore());
  const { getSections } = useSectionsStore();

  const { t } = useI18n();

  const departmentsArr = computed<IMultiselectOptionProps[]>(() => {
    if (sections.value.length) {
      return sections.value.map(section => {
        return { name: section.name, id: section.id };
      });
    } else {
      return [];
    }
  });

  const jobsArr = computed<IMultiselectOptionProps[]>(() => {
    if (usersList.value.length) {
      return usersList.value
        .filter(user => {
          if (user.jobTitle) {
            return user;
          }
        })
        .map(user => {
          return { name: user.jobTitle, id: user.id };
        });
    } else {
      return [];
    }
  });

  const departmentsValue = ref<IMultiselectOptionProps[]>([]);
  const jobsValue = ref<IMultiselectOptionProps[]>([]);

  const searchValue = ref<string>('');

  const sortValue = ref<ISelectValue>({
    name: t('authors.sortOptions.date'),
    value: 'name',
  });

  const sortOptions = computed<ISelectValue[]>(() => {
    return [
      {
        name: t('authors.sortOptions.name'),
        value: 'name',
      },
      {
        name: t('authors.sortOptions.surname'),
        value: 'surname',
      },
      {
        name: t('authors.sortOptions.date'),
        value: 'createdAt',
      },
    ];
  });

  const authorsModel = ref({
    departmentsValue: departmentsValue.value,
    jobsValue: jobsValue.value,
  });

  const page = ref(0);

  const pageCount = computed(() => Math.ceil(usersListCount.value / 6));

  const itemsVisible = computed(() => {
    const start = usersListCount.value > 0 ? (page.value + 1) * 6 - 5 : 0;
    const end =
      (page.value + 1) * 6 < usersListCount.value ? (page.value + 1) * 6 : usersListCount.value;
    return {
      start: start < end ? start : end,
      end,
    };
  });

  const filters = computed(() => {
    return {
      limit: 6,
      search: searchValue.value,
      page: getCurrentPage(page.value, pageCount.value),
      orderBy: sortValue.value.value,
    };
  });

  watch(filters, () => {
    getUsers(filters.value);
  });

  onMounted(() => {
    getSections();
    getUsers();
  });
</script>

<style scoped lang="scss">
  .authors {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    container-type: inline-size;

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, auto);
      gap: var(--space-xl);
      justify-content: center;
      container-type: inline-size;

      @include w-max($xxl) {
        grid-template-columns: repeat(3, 1fr);
        width: auto;
      }

      @include w-max($lg) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include w-max($md) {
        grid-template-columns: 1fr;
        width: 100%;
        justify-content: flex-start;
      }
    }
  }

  @include w-max-container($md) {
    .authors {
      &__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @include w-max-container($sm + 43) {
    .authors {
      &__grid {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
