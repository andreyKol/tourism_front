export const normalizeCardNumber = (value: string): string => {
  if (value.length >= 19) {
    return (value = `${value.slice(0, 3)} ${value
      .slice(3)
      .match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19)}`);
  } else if (value.length === 18) {
    return (value = `${value.slice(0, 2)} ${value
      .slice(2)
      .match(/.{1,4}/g)
      ?.join(' ')}`);
  } else if (value.length === 17) {
    return (value = `${value.slice(0, 1)} ${value
      .slice(1)
      .match(/.{1,4}/g)
      ?.join(' ')}`);
  }
  return value.match(/.{1,4}/g)?.join(' ') || '';
};
