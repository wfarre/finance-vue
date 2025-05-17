import { Pot } from "../models/Pot";
import type { PotAPI } from "../utils/typePot";

export class PotFactory {
  static create(data: PotAPI, type: string): Pot {
    if (type === "json") {
      return new Pot(data);
    }

    return new Pot(data);
  }
}
