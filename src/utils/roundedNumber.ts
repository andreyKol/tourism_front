import { notAllNull } from './notAllNull';

export const roundedNumber = (number: any) => {
  if (!number && number !== 0) {
    return null;
  }

  if (Number.isInteger(Number(number))) {
    return number;
  }

  return notAllNull(String(Number(number)));
};
