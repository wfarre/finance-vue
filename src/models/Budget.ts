import type { BudgetAPI } from "../utils/typeBudget";

export interface IBudget {
  id: number;
  category: string;
  maximum: number;
  theme: string;
}

export class Budget {
  private _id: number;
  private _category: string;
  private _maximum: number;
  private _theme: string;

  constructor(data: BudgetAPI) {
    this._id = data.id;
    this._category = data.category;
    this._maximum = data.maximum;
    this._theme = data.theme;
  }

  public get category() {
    return this._category;
  }
  public get maximum() {
    return this._maximum;
  }
  public get theme() {
    return this._theme;
  }
  public get id() {
    return this._id;
  }
}
