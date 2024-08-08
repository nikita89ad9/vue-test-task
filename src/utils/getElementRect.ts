export const getElementRect = (
  el: HTMLElement,
  parent: HTMLElement,
  wWidth: number,
  wHeight: number
): DOMRect => {
  const clone = el.cloneNode(true) as HTMLElement;
  const parentWidth = parent.clientWidth as number;
  const parentHeight = parent.clientHeight as number;
  clone.style.cssText =
    'position:fixed;top:0;left:0;overflow:auto;pointer-events:none;min-width:unset;max-width:unset;;min-height:unset;max-height:387px;z-index:999';
  document.body.append(clone);
  const rect = clone.getBoundingClientRect();

  if (rect.width === wWidth) {
    rect.width = parentWidth;
  }

  if (rect.height === wHeight) {
    rect.height = parentHeight;
  }

  clone.remove();
  return rect;
};
