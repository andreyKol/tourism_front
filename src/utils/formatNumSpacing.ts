export const formatNumSpacing = (num: number) => {
  if (num) {
    return new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(num);
  }
  return num;
};
