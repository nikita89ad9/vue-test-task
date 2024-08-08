import type { ISectionDTO } from '@/services/sections/sections.types';

export type TSectionsSortOptions = 'name' | 'articles' | 'subscribers';

export interface ISectionItemProps {
  item: ISectionDTO;
}
