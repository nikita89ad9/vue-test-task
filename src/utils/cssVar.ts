export const getCSSVariable = (variableName: string) => {
  return document.documentElement.computedStyleMap().get(variableName)?.toString();
};

export const setCSSVariable = (variableName: string, variableValue: string | number) => {
  document.documentElement.attributeStyleMap?.set(variableName, variableValue);
};
