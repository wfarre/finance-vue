import type { TransactionAPI } from "../utils/typeTransaction";
import {
  checkIfTransactionDueSoon,
  formatDate,
  formatMoneyAmount,
  getRemainingDaysBeforeDueDate,
} from "../utils/utils";

export class Transaction {
  private _avatar: string;
  private _name: string;
  private _category: string;
  private _date: string;
  private _amount: number;
  private _recurring: boolean;

  constructor(data: TransactionAPI) {
    this._avatar = data.avatar;
    this._name = data.name;
    this._category = data.category;
    this._date = data.date;
    this._amount = data.amount;
    this._recurring = data.recurring;
    // this._date = data.createdAt;
  }

  public get avatar() {
    return this._avatar;
  }
  public get name() {
    return this._name;
  }
  public get category() {
    return this._category;
  }
  public get date() {
    return this._date;
  }
  public get formattedDate() {
    return formatDate(this._date);
  }

  public get formattedDateTime() {
    return formatDate(this._date, true);
  }

  public get amount() {
    return this._amount;
  }
  public get formattedAmount() {
    return formatMoneyAmount(this._amount);
  }
  public get recurring() {
    return this._recurring;
  }

  public get isDueSoon() {
    return checkIfTransactionDueSoon(this._date);
  }

  public get isDueSoonIcon() {
    switch (this.isDueSoon) {
      case "dueSoon":
        return "/images/icon-bill-due.svg";
      case "paid":
        return "/images/icon-bill-paid.svg";
      default:
        return "";
    }
  }
}
