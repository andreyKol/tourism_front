export const formatCardNumber = (input: string) => {
  if (!input) return '';

  const digitsOnly = input.replace(/\D/g, '');

  if (digitsOnly.length === 16) {
    const formattedNumber = digitsOnly.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    return formattedNumber;
  }

  return input;
};
