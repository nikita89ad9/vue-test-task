import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { HeaderMenu, HeaderMenuUnion } from '@/components/DataTable/types';
import { icons } from '@/utils/icons';

export function useAdminHeaderMenu<T extends HeaderMenuUnion>(
  action1: (arg: T) => void,
  action2: (arg: string) => void
) {
  const { t } = useI18n();

  const menuItems = computed<HeaderMenu<T>[]>(() => [
    {
      icon: icons.edit,
      text: t('admin.tableMenu.edit'),
      name: 'edit',
      action: itemData => action1(itemData),
    },
    {
      icon: icons.delete,
      text: t('admin.tableMenu.delete'),
      name: 'delete',
      action: itemData => action2(itemData.id),
    },
  ]);

  return {
    menuItems,
  };
}
