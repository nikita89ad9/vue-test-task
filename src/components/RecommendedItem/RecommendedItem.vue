<template>
  <div class="item">
    <img
      :src="props.image.src"
      :alt="props.image.alt"
      class="item__image"
    />
    <div class="item__create">
      <UserBadge
        avatarSize="40"
        class="item__create-author"
      >
        {{ props.author }}
      </UserBadge>
      <Date
        :utcDate="props.created"
        class="item__create-date"
      />
    </div>
    <div class="item__content">
      <h4 class="item__heading">
        <RouterLink
          class="item__link"
          :to="{ name: 'Articles' }"
        >
          {{ props.title }}
        </RouterLink>
      </h4>
      <p class="item__description">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Date from '@components/Date/Date.vue';
  import UserBadge from '@components/UserBadge/UserBadge.vue';
  import type { RecomnedationItem } from '@/types/Recommended';

  const props = defineProps<RecomnedationItem>();
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    text-align: justify;
    padding: var(--space-l);
    background-color: var(--color-background-primary);
    box-shadow: var(--shadow-widget);
    width: 350px;

    &__create {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &__heading {
      font-size: var(--font-size-xm);
      color: var(--color-font-primary);
    }

    &__link {
      color: var(--color-font-primary);
    }

    &__description {
      font-size: var(--font-size-s);
      color: var(--color-font-primary);
      line-height: 1.5;
    }
  }
</style>
