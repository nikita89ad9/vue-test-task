/* eslint-disable @typescript-eslint/no-explicit-any */
export const serializeParams = (params: Record<string, any>) => {
  return Object.keys(params)
    .filter(
      key =>
        (Array.isArray(params[key]) && params[key].length > 0) ||
        (!Array.isArray(params[key]) && typeof params[key] !== 'undefined')
    )
    .map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${encodeURIComponent(value)}`).join('&');
      }

      return `${key}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
};
