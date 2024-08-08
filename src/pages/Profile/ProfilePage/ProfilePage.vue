<template>
  <div class="profile">
    <ProfilePanel />
    <RouterView #default="{ Component }">
      <Transition mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import ProfilePanel from '../components/ProfilePanel/ProfilePanel.vue';
</script>

<style scoped lang="scss">
  .profile {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    background: transparent;
  }
</style>
