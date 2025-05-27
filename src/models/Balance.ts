import type { BalanceAPI } from "../utils/typeBalance";

export class Balance {
  private _current: number;
  private _income: number;
  private _expenses: number;

  constructor(data: BalanceAPI) {
    this._current = data.current;
    this._expenses = data.expenses;
    this._income = data.income;
  }

  get current() {
    return this._current;
  }

  get income() {
    return this._income;
  }
  get expenses() {
    return this._expenses;
  }
}
