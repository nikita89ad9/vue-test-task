export const isString = (value: unknown): value is string => typeof value === 'string';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isObjectHasKey = <T>(obj: T, key: PropertyKey): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
