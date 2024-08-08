import type { IExample } from '@stores/authStore/models';
import type { IExampleCreateDTORes } from '@services/example/example.types';
import type { WithoutId } from '@utils/object';

export const mapExampleDTOToStoreExample = (example: IExampleCreateDTORes): IExample => {
  return {
    id: example.id,
    example: example.example,
  };
};

export const mapExamplesDTOToStoreExamples = (examples: IExampleCreateDTORes[]): IExample[] => {
  return examples.map(mapExampleDTOToStoreExample);
};
export const EMPTY_EXAMPLE: WithoutId<IExample> = { example: '' };
