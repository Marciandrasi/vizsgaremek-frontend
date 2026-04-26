export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0 Ft';
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0,
  }).format(amount);
};
