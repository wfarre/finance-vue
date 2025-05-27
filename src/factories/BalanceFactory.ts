import { Balance } from "../models/Balance";
import type { BalanceAPI } from "../utils/typeBalance";

export class BalanceFactory {
  static create(data: BalanceAPI, type: string): Balance {
    if (type === "json") {
      return new Balance(data);
    }

    return new Balance(data);
  }
}
