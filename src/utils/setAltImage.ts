export const setAltImg = (event: Event, url: string) => {
  const target = event.target as HTMLImageElement;
  const imagePlaceholder = url;
  target.src = imagePlaceholder;
};
