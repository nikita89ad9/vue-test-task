<template>
  <BaseDropdown
    closeOnClickOutside
    class="dropdown_right dropdown_bottom"
  >
    <template #trigger>
      <span class="button">
        <IconWrapper
          :icon="icons.moreVertical"
          class="button__icon"
        />
      </span>
    </template>
    <template #content>
      <BaseMenu>
        <HeaderMenuItem
          v-for="menuItem in menuItems"
          :key="menuItem.text"
          @click="menuItem.action()"
        >
          <template #icon>
            <IconWrapper :icon="menuItem.icon" />
          </template>
          <template #text>
            {{ menuItem.text }}
          </template>
        </HeaderMenuItem>
      </BaseMenu>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseDropdown from '@/components/common/BaseDropdown/BaseDropdown.vue';
  import BaseMenu from '@/components/common/BaseMenu/BaseMenu/BaseMenu.vue';
  import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { icons } from '@/utils/icons';

  const { t } = useI18n();

  const emit = defineEmits<(e: 'toggleModal') => void>();

  const menuItems = computed(() => [
    {
      icon: icons.star,
      text: t('articles.favorite'),
      name: 'edit',
      action: () => alert('Add to favorites'),
    },
    {
      icon: icons.alert,
      text: t('articles.report'),
      name: 'delete',
      action: () => emit('toggleModal'),
    },
  ]);
</script>

<style scoped lang="scss">
  .button {
    width: var(--space-3xl);
    height: var(--space-3xl);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background-secondary);
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition-even);

    &:hover {
      background: var(--color-extra-light);
    }

    &__icon {
      :deep(path) {
        fill: var(--color-font-secondary);
      }
    }
  }
</style>
