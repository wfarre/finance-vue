import Icon from "../components/Icon.vue";
import type { TransactionFactory } from "../factories/TransactionFactory";
import type { Transaction } from "../models/Transaction";
import { dueDate } from "./constants";

export const formatMoneyAmount = (amount: number): string => {
  const stringAmount = String(amount);
  if (stringAmount.includes("-")) {
    return "-$" + stringAmount.split("-")[1];
  }
  return "+$" + stringAmount;
};

export const formatDate = (date: string, isTime: boolean = false): string => {
  const getDate = new Date(date);
  if (isTime) {
    return getDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
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

export const getRemainingDaysBeforeDueDate = (date: string) => {
  const formattedDate = new Date(date);
  const remainingTime = formattedDate.getTime() - dueDate.getTime();

  return remainingTime / (24 * 60 * 60 * 1000);
};

export const checkIfTransactionDueSoon = (date: string) => {
  const remainingDays = getRemainingDaysBeforeDueDate(date);

  if (remainingDays > 0 && remainingDays < 5) return "dueSoon";
  if (remainingDays < 0) return "paid";
};

export const sortBy = <T extends Transaction>(
  array: T[],
  sortFilter: string,
): T[] => {
  switch (sortFilter.toLowerCase()) {
    case "latest":
    case "oldest":
      return array.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        return sortFilter.toLowerCase() === "oldest"
          ? dateA - dateB
          : dateB - dateA;
      });
    case "highest":
      return array.sort((a, b) => b.amount - a.amount);
    case "lowest":
      return array.sort((a, b) => a.amount - b.amount);
    case "a to z":
      return array.sort((a, b) => a.name.localeCompare(b.name));
    case "z to a":
      return array.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return array.sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        return dateB - dateA;
      });
  }
};

export const removeDoublon = (array: Transaction[]) => {
  const object: { [key: string]: Transaction } = {};
  for (let i = 0; i < array.length; i++) {
    if (!object[array[i].name] || object[array[i].name].date < array[i].date) {
      object[array[i].name] = array[i];
    }
  }
  return Object.values(object);
};

export const filterBySearch = <T extends TransactionFactory>(
  array: T[],
  searchInput: string,
): T[] =>
  searchInput.length > 0
    ? array.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : array;

export const filterByCategory = <T extends TransactionFactory>(
  array: T[],
  category: string,
): T[] =>
  category === "all"
    ? array
    : array.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      );
