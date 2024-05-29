export const notAllNull = (amount: string) => {
  const str = amount.split('').reverse();
  const firstNonZeroIndex = str.findIndex((char) => char !== '0');
  const arrWithoutNull = str.slice(firstNonZeroIndex, str.length);
  const strWithoutNull = arrWithoutNull.reverse().join('');
  return strWithoutNull.endsWith('.') ? `${strWithoutNull}00` : strWithoutNull;
};
