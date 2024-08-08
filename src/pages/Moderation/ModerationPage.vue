<template>
  <div class="moderation">
    <ModerationNavigationPanel />
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
  import ModerationNavigationPanel from './ModerationNavigationPanel.vue';
</script>

<style scoped lang="scss">
  .moderation {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
