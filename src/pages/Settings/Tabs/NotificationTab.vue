<template>
  <div class="checkbox-group">
    <h2>{{ t('settings.notificationSetting') }}</h2>
    <BaseCheckBoxGroup
      :modelValue="notificationSettingsHeaders"
      :onUpdate:modelValue="hanldeChange"
    >
    </BaseCheckBoxGroup>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import BaseCheckBoxGroup from '@/components/common/BaseCheckbox/BaseCheckBoxGroup.vue';
  import type { ICheckbox } from '@/components/common/BaseCheckbox/types';
  import { useNotificationStore } from '@/stores/notificationStore/store';
  import { notificationSettingsHeaders } from '../sideBarItems';

  const { setNotifications } = useNotificationStore();
  const { t } = useI18n();

  const hanldeChange = (checkboxes: ICheckbox[]) => {
    setNotifications(checkboxes.filter(el => el.modelValue));
  };
</script>

<style scoped lang="scss">
  .checkbox-group {
    h2 {
      font-size: var(--font-size-l);
      font-family: var(--font-manrope-medium);
    }

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--space-2xl);
  }
</style>
