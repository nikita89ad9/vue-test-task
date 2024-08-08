import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { TableHeader } from '@/components/DataTable/types';

export function useAdminTable() {
  const { t } = useI18n();

  const tableHeadersUsers = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'email',
      text: t('table.tableHeader.email'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.name'),
    },
    {
      key: 'surname',
      text: t('table.tableHeader.surname'),
    },
    {
      key: 'roles',
      text: t('table.tableHeader.role'),
    },
    {
      key: 'department',
      text: t('table.tableHeader.department'),
    },
    {
      key: 'jobTitle',
      text: t('table.tableHeader.jobTitle'),
    },
    {
      key: 'professionalLevel',
      text: t('table.tableHeader.professionalLevel'),
    },
    {
      key: 'createdAt',
      text: t('table.tableHeader.created'),
    },
    {
      key: 'updatedAt',
      text: t('table.tableHeader.updatedAt'),
    },
  ]);

  const tableHeadersArticles = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'title',
      text: t('table.tableHeader.title'),
    },
    {
      key: 'authorName',
      text: t('table.tableHeader.authorName'),
    },
    {
      key: 'authorEmail',
      text: t('table.tableHeader.authorEmail'),
    },
    {
      key: 'section',
      text: t('table.tableHeader.section'),
    },
    {
      key: 'created',
      text: t('table.tableHeader.created'),
    },
    {
      key: 'status',
      text: t('table.tableHeader.status'),
    },
  ]);

  const tableHeadersMeetups = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'title',
      text: t('table.tableHeader.title'),
    },
    {
      key: 'authorName',
      text: t('table.tableHeader.authorName'),
    },
    {
      key: 'authorEmail',
      text: t('table.tableHeader.authorEmail'),
    },
    {
      key: 'section',
      text: t('table.tableHeader.section'),
    },
    {
      key: 'created',
      text: t('table.tableHeader.created'),
    },
    {
      key: 'status',
      text: t('table.tableHeader.status'),
    },
  ]);

  const tableHeadersSections = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.title'),
    },
    {
      key: 'description',
      text: t('table.tableHeader.description'),
    },
    {
      key: 'moderator',
      text: t('table.tableHeader.moderator'),
    },
    {
      key: 'createdAt',
      text: t('table.tableHeader.created'),
    },
    {
      key: 'status',
      text: t('table.tableHeader.status'),
    },
  ]);

  const tableHeadersTags = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.name'),
    },
  ]);

  const tableHeadersDepartments = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.name'),
    },
  ]);

  const tableHeadersJobTitles = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.name'),
    },
  ]);

  const tableHeadersProfessionalLevels = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.name'),
    },
  ]);

  const tableHeadersSubscriptions = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'title',
      text: t('table.tableHeader.title'),
    },
    {
      key: 'subtitle',
      text: t('table.tableHeader.subtitle'),
    },
    {
      key: 'features',
      text: t('table.tableHeader.features'),
    },
    {
      key: 'price',
      text: t('table.tableHeader.price'),
    },
    {
      key: 'discount',
      text: t('table.tableHeader.discount'),
    },
    {
      key: 'isPublished',
      text: t('table.tableHeader.published'),
    },
  ]);

  const tableHeadersFaq = computed<TableHeader[]>(() => [
    {
      key: 'id',
      text: t('table.tableHeader.id'),
    },
    {
      key: 'name',
      text: t('table.tableHeader.title'),
    },
    {
      key: 'description',
      text: t('table.tableHeader.description'),
    },
  ]);

  return {
    tableHeadersUsers,
    tableHeadersArticles,
    tableHeadersMeetups,
    tableHeadersSections,
    tableHeadersTags,
    tableHeadersDepartments,
    tableHeadersJobTitles,
    tableHeadersProfessionalLevels,
    tableHeadersFaq,
    tableHeadersSubscriptions,
  };
}
