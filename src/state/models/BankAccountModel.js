import BaseModel, { Field, FieldType } from "../BaseModel";
import { makeObservable, observable } from "mobx";
import { bankAccount, bankInstitution, bankTransit } from "./validators";

class BankAccountModel extends BaseModel {
  institution = new Field(this, "institution", {
    required: true,
    validation: bankInstitution,
  });
  transit = new Field(this, "transit", {
    required: true,
    validation: bankTransit,
  });
  account = new Field(this, "account", {
    required: true,
    validation: bankAccount,
  });

  constructor(parent) {
    super(parent);
    makeObservable(this, {
      institution: observable,
      transit: observable,
      account: observable,
    });
  }
}

export default BankAccountModel;
