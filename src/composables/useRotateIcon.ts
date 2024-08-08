import { ref } from 'vue';

export const useRotateIcon = () => {
  const rotation = ref('0deg');

  const rotateIcon = () => {
    if (rotation.value === '0deg') {
      rotation.value = '180deg';
    } else {
      rotation.value = '0deg';
    }
  };

  return { rotation, rotateIcon };
};
