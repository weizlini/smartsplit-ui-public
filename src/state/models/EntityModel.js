import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator, passwordValidator } from "./validators";

import { makeObservable, observable } from "mobx";
class EntityModel extends BaseModel {
  id = new Field(this, "id", {
    primary: true,
  });
  /*user_id = new Field(this, "user_id", {
    type: FieldType.int,
    required: true,
  });*/
  name = new Field(this, "name", {
    label: "Nom de groupe, ou d'artiste",
    type: FieldType.string,
    required: true,
    ui: "text",
  });
  bio = new Field(this, "bio", {
    label: "Bio",
    type: FieldType.string,
    required: false,
    ui: "textarea",
  });
  short_description = new Field(this, "short_description", {
    label: "Description Courte",
    type: FieldType.string,
    required: false,
    ui: "textarea",
  });
  /*media_id = new Field(this, "media_id", {
    type: FieldType.int,
    required: false,
    ui:"photo"
  });
  /*created_at = new Field(this, "created_at", {
    type: FieldType.date,
    required: false,
    pseudo: true,
  });
  updated_at = new Field(this, "updated_at", {
    type: FieldType.date,
    required: false,
    pseudo: true,
  });*/
  constructor(parent) {
    super(parent);
    makeObservable(this, {
      id: observable,
      user_id: observable,
      name: observable,
      bio: observable,
      short_description: observable,
      media_id: observable,
      created_at: observable,
      updated_at: observable,
    });
  }
}
export default EntityModel;
