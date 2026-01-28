import BaseModel, { Field, FieldType } from "../BaseModel";
import { passwordValidator, samePasswordResetValidator } from "./validators";
import { makeObservable, observable } from "mobx";

class ResetPasswordModel extends BaseModel {
  new_password = new Field(this, "new_password", {
    label: "Password",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: passwordValidator,
  });

  confirm_password = new Field(this, "confirm_password", {
    label: "Password",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: samePasswordResetValidator,
  });
  constructor() {
    super();
    makeObservable(this, {
      new_password: observable,
      confirm_password: observable,
    });
  }
}

export default ResetPasswordModel;
