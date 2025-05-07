import { Pot } from "../models/Pot";
import type { PotAPI } from "../utils/typePot";

export class PotFactory extends Pot {
  constructor(data: PotAPI, type: string) {
    super(data);
    if (type === "json") {
      return new Pot(data);
    }
  }
}
