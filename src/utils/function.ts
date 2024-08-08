import type { Id } from '@utils/object';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyFunction = (...args: any[]) => any;

export const isTypeId = <T extends Id>(value: T | unknown): value is Id =>
  ['string', 'number'].includes(typeof value);

export const constVoid = (): void => void 0;

export const notNullable = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;
