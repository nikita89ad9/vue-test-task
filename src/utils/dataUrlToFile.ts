import { UIUniqid } from '@utils/UIUniqid';

export const dataUrlToFile = async (dataUrl: string) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const fileName = `${UIUniqid()}.png`;
  return new File([blob], fileName, { type: 'image/png' });
};
