<template>
  <BaseLayout class="authors">
    <SectionHeader :header="authorsHeader" />
    <div class="authors__grid">
      <AuthorsItem
        v-for="item in authorsComputed"
        :key="item.id"
        :author="item"
        @redirectToTarget="redirectToTarget"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import BaseLayout from '@/components/common/BaseLayout/BaseLayout.vue';
  import type { IUserDTO } from '@/services/user/user.types';
  import router from '@/router';
  import AuthorsItem from './AuthorsItem.vue';
  import SectionHeader from '../SectionHeader.vue';

  const props = defineProps<{
    authors: IUserDTO[];
  }>();

  const authorsComputed = computed(() =>
    props.authors.map(author => {
      return {
        id: author.id,
        name: author.name ? `${author.name} ${author.surname}` : author.email,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        jobTitle: author.jobTitle ?? 'Developer',
        avatar: author.avatar,
      };
    })
  );

  const authorsHeader = {
    title: 'general.authors',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    route: 'Authors',
  };

  const redirectToTarget = (id: string) => {
    router.push({ name: 'Profile', params: { profileID: id } });
  };
</script>

<style scoped lang="scss">
  .authors {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: var(--space-3xl);
    background-color: var(--color-background-primary);

    &__header {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: var(--space-m);

      &--p {
        font-size: var(--font-size-m);
      }
    }

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-m);

      @include w-max($xl) {
        grid-template-columns: repeat(2, 1fr);
        width: auto;
        margin: auto;
      }

      @include w-max($md) {
        grid-template-columns: 1fr;
        width: 100%;
        justify-content: flex-start;
      }
    }
  }
</style>
