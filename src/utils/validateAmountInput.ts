export const validateAmountInput = (value: string) => {
  const regex = /^\d{1,}(?:\.\d+)?$/;
  return regex.test(value);
};
