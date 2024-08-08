import uniqId from 'uniqid';

const uiidPrefix = 'uiid' as const;

/**
 * UIUniqid is useful for generating ids that are `UI specific`.
 */
export type TUIUniqid = `${typeof uiidPrefix}_${string}`;

export function UIUniqid(): TUIUniqid {
  return `${uiidPrefix}_${uniqId()}`;
}

export function isUIUniqid(id: string): id is TUIUniqid {
  return id.includes(uiidPrefix);
}
