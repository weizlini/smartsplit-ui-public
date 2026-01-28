import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator, passwordValidator } from "./validators";

import { makeObservable, observable } from "mobx";

class LoginModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this, {
      email: observable,
      password: observable,
    });
  }
  email = new Field(this, "email", {
    label: "Email",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: emailValidator,
  });

  password = new Field(this, "password", {
    label: "Password",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: passwordValidator,
  });
}

export default LoginModel;
