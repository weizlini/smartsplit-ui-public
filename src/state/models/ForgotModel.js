import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator } from "./validators";

import { makeObservable, observable } from "mobx";

class ForgotModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this, {
      email: observable,
    });
  }
  email = new Field(this, "email", {
    label: "Email",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: emailValidator,
  });
}

export default ForgotModel;
