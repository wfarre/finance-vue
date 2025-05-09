export const formatMoneyAmount = (amount: number): string => {
  const stringAmount = String(amount);
  if (stringAmount.includes("-")) {
    return "-$" + stringAmount.split("-")[1];
  }
  return "+$" + stringAmount;
};

export const formatDate = (date: string): string => {
  const getDate = new Date(date);
  return getDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const roundNumberToTwoDecinals = (number: number) =>
  (Math.round(number * 100) / 100).toFixed(2);

export const formatCurrency = (number: number, isDecimal: boolean = true) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: !isDecimal ? 0 : 2,
    minimumFractionDigits: !isDecimal ? 0 : 2,
  }).format(number);
