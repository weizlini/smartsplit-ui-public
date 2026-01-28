import BaseModel, { Field, FieldType } from "../BaseModel";
import { makeObservable, observable } from "mobx";

class WithdrawModel extends BaseModel {
  method = new Field(this, "method", {
    required: true,
  });
  amount = new Field(this, "amount", {
    required: true,
    type: FieldType.string,
  });
  /*
  transaction_fee = new Field(this, "transaction_fee", {
    required: true,
    type: FieldType.string,
    default: "0.75",
  });
  smartsplit_fee = new Field(this);
   */
  receiptId = new Field(this, "receiptId", {
    required: true,
    type: FieldType.string,
  });
  constructor(parent) {
    super(parent);
    makeObservable(this, {
      method: observable,
      amount: observable,
      receiptId: observable,
    });
  }
}

export default WithdrawModel;
