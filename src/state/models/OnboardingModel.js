import BaseModel, { Field, FieldType } from "../BaseModel";
import { makeObservable, observable } from "mobx";
import {
  emailUniqueValidator,
  emailValidator,
  passwordValidator,
  samePasswordValidator,
} from "./validators";

class OnboardingModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this, {
      first_name: observable,
      last_name: observable,
      artist_name: observable,
    });
  }

  first_name = new Field(this, "first_name", {
    label: "first_name",
    required: false,
    type: FieldType.string,
  });
  last_name = new Field(this, "last_name", {
    label: "last_name",
    required: false,
    type: FieldType.string,
  });
  artist_name = new Field(this, "artist_name", {
    label: "artist_name",
    required: false,
    type: FieldType.string,
  });
}

export default OnboardingModel;
