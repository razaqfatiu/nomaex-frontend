export const formatCurrency = (number) => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
}).format(number)