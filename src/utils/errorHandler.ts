import type { TAnyFunction } from '@utils/function';
import { isObjectHasKey } from '@/types/predicates';

const errorHandlerKey = 'errorHandlerKey' as const;

export interface TCatchReturnErrorHandler {
  [errorHandlerKey]: true;
  error: Error;
}

export const ErrorHandler = <F extends TAnyFunction>(
  f: F,
  args?: [...Parameters<F>]
): TCatchReturnErrorHandler | ReturnType<F> => {
  try {
    return Array.isArray(args) ? f(...args) : f();
  } catch (err) {
    const optionalMessage = typeof f === 'function' ? `[${f.name || 'function'}]` : '';

    console.error(`Error Handler: ${optionalMessage}`, err);

    return { [errorHandlerKey]: true, error: err as Error };
  }
};

export const isCatchHandlerError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  v: TCatchReturnErrorHandler | any
): v is TCatchReturnErrorHandler => {
  return isObjectHasKey(v, errorHandlerKey) ? v[errorHandlerKey] : false;
};
