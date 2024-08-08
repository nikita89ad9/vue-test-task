/**
 * DTO - Data Transfer Object.
 * Very commonly used on the backend, it helps to encapsulate which form of data
 * will be transferred across the HttpRequest.
 * @see
 * It's important to split up RequestDTO and ResponseDTO to a different types, because
 * this way we escape tight coupling of types for data for Request and Response.
 */
import type { AtLeastOne, AtLeastOneExcept, WithoutId } from '@utils/object';

interface IExampleDTO {
  id: number;
  example: string;
  example2: string;
}

//Create
export type IExampleCreateDTOReq = WithoutId<IExampleDTO>;

export type IExampleCreateDTORes = IExampleDTO;

//Update
export type IExampleUpdateDTOReq = AtLeastOne<WithoutId<IExampleDTO>>;

export type IExampleUpdateDTORes = AtLeastOneExcept<IExampleDTO, 'id'>;
