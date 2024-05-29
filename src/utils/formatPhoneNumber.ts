export const formatPhoneNumber = (input: string) => {
  if (!input) return '';

  const digitsOnly = input.replace(/\D/g, '');
  if (digitsOnly.startsWith('7')) {
    const formattedNumber = digitsOnly.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    return formattedNumber;
  }
  const formattedNumber = digitsOnly.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
  return formattedNumber;
};
