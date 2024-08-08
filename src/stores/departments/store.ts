import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { departmentsService } from '@/services/departments/departments.service';
import type {
  IDepartmentDTO,
  IDepartmentDTOCreateReq,
  IDepartmentDTOUpdateReq,
} from '@/services/departments/departments.types';
import { catchError } from '@/utils/catchError';
import type { QueryParams } from '@/types/QueryParams';

export const useDepartmentsStore = defineStore('departmentsStore', () => {
  const departments = ref<IDepartmentDTO[]>([]);
  const departmentsCount = ref<number>(0);
  const loaded = ref(false);

  const defaultRequestParams = ref<QueryParams>({
    search: '',
    page: 0,
  });

  const getDepartments = async (requestParams: QueryParams = defaultRequestParams.value) => {
    try {
      const response = await departmentsService.getAll(requestParams);
      defaultRequestParams.value = requestParams;
      if (response) {
        departments.value = response[0];
        departmentsCount.value = response[1];
        loaded.value = true;
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const addDepartment = async (department: IDepartmentDTOCreateReq) => {
    try {
      await departmentsService.create(department);
      getDepartments();
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const updateDepartment = async (id: string, department: IDepartmentDTOUpdateReq) => {
    try {
      await departmentsService.updateByID(id, department);
      getDepartments();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      await departmentsService.deleteByID(id);
      getDepartments();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  const deleteSomeDepartments = async (departments: string[]) => {
    try {
      await departmentsService.deleteSome(departments);
      getDepartments();
    } catch (error) {
      catchError(error as AxiosError);
    }
  };

  return {
    departments,
    departmentsCount,
    loaded,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    deleteSomeDepartments,
  };
});
