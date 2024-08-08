/**
 * @description
 * Helps with the partial objects functions arguments, but errors the empty object case, which is allowed by simple Partial<T>
 * @example
 * function badUpdateSomeEntity(updates: Partial<Entity>): Entity
 * badUpdateSomeEntity({ property: 123 }) // ok
 * badUpdateSomeEntity() // error - expected
 * badUpdateSomeEntity({}) // ok - not expected, should not be allowed to do such operation
 *
 * function goodUpdateSomeEntity(object: AtLeastOne<Entity>): Entity
 * goodUpdateSomeEntity({ property: 123 }) // ok
 * goodUpdateSomeEntity() // error - expected
 * goodUpdateSomeEntity({}) // error - nice!
 */
export type AtLeastOne<T extends object> = Partial<T> &
  { [K in keyof T]: Required<Pick<T, K>> }[keyof T];

export type Id = string | number;

export interface WithId {
  id: Id;
}

export type WithoutId<T extends WithId> = Omit<T, 'id'>;

export type PartialExcept<T extends object, K extends keyof T = keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;

export type AtLeastOneExcept<T extends object, K extends keyof T = keyof T> = Required<Pick<T, K>> &
  AtLeastOne<Omit<T, K>>;
