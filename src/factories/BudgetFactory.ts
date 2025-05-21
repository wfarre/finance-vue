import { Budget } from "../models/Budget";
import type { BudgetAPI } from "../utils/typeBudget";

export class BudgetFactory {
  static create(data: BudgetAPI, type: string): Budget {
    if (type === "json") {
      return new Budget(data);
    }

    return new Budget(data);
  }
}
