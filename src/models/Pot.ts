import type { PotAPI } from "../utils/typePot";

export class Pot {
  private _name: string;
  private _target: number;
  private _total: number;
  private _theme: string;

  constructor(data: PotAPI) {
    this._name = data.name;
    this._target = data.target;
    this._total = data.total;
    this._theme = data.theme;
  }

  public get name() {
    return this._name;
  }
  public get target() {
    return this._target;
  }
  public get total() {
    return this._total;
  }
  public get theme() {
    return this._theme;
  }
}
