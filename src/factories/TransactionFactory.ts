import { Transaction } from "../models/Transaction";
import type { TransactionAPI } from "../utils/typeTransaction";

export class TransactionFactory extends Transaction {
    constructor(data: TransactionAPI, type: string){
        super(data);
        if(type === "json"){
            return new Transaction(data)
        }
    }
}