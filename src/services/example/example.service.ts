import { httpRequest } from '@/api';
import { exampleRoutes } from '@services/example/example.routes';
import type { IExampleCreateDTOReq, IExampleCreateDTORes } from '@services/example/example.types';

const exampleService = {
  createExample: (example: IExampleCreateDTOReq) => {
    return httpRequest().post<IExampleCreateDTORes>(exampleRoutes.createExample(), example);
  },
};

exampleService.createExample({ example: '', example2: '' });
