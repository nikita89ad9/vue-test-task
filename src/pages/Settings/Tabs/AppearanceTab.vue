<template>
  <div class="appearance-settings">
    <h2>{{ t('settings.appearanceSetting') }}</h2>
    <h3>{{ t('settings.chooseUrTheme') }}</h3>

    <BaseRadioGroup
      v-model="theme"
      class="appearance-settings__radio-group"
      :name="UIUniqid()"
    >
      <BaseRadioButton
        v-for="item in appearanceSettingsHeaders"
        :id="UIUniqid()"
        :key="item.name"
        :value="item.value"
        :checked="theme === item.value"
      >
        {{ item.name }}
      </BaseRadioButton>
    </BaseRadioGroup>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useI18n } from 'vue-i18n';

  import BaseRadioButton from '@/components/common/BaseRadio/BaseRadioButton.vue';
  import BaseRadioGroup from '@/components/common/BaseRadio/BaseRadioGroup.vue';
  import { useThemeStore } from '@/stores/themeStore/store';
  import { UIUniqid } from '@/utils/UIUniqid';
  import { appearanceSettingsHeaders } from '../sideBarItems';

  const { t } = useI18n();
  const { theme } = storeToRefs(useThemeStore());
</script>

<style scoped lang="scss">
  .appearance-settings {
    h2 {
      font-size: var(--font-size-l);
      font-family: var(--font-manrope-medium);
    }

    h3 {
      font-size: var(--font-size-s);
      font-family: var(--font-manrope-regular);
    }

    &__radio-group {
      gap: 10px;
    }

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--space-2xl);
  }
</style>
