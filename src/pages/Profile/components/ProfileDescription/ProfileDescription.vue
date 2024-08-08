<template>
  <div class="profile-description">
    <ProfileInfo />
    <ProfileSections />
    <ProfileTopics />
    <ProfileAuthors />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';

  import ProfileAuthors from '@/pages/Profile/components/ProfileAuthors/ProfileAuthors.vue';
  import ProfileInfo from '@/pages/Profile/components/ProfileInfo/ProfileInfo.vue';
  import ProfileSections from '@/pages/Profile/components/ProfileSections/ProfileSections.vue';
  import ProfileTopics from '@/pages/Profile/components/ProfileTopics/ProfileTopics.vue';
  import { useProfileStore } from '@stores/profileStore/store';

  const route = useRoute();

  const { getProfile } = useProfileStore();

  const profileId = computed<string>(() => route.params.profileID as string);

  onMounted(async () => {
    await getProfile(profileId.value);
  });

  onBeforeRouteUpdate(to => {
    getProfile(to.params.profileID as string);
  });
</script>

<style scoped lang="scss">
  .profile-description {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    background: transparent;
  }
</style>
