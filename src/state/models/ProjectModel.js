import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator, passwordValidator } from "./validators";

import { makeObservable, observable } from "mobx";

class ProjectModel extends BaseModel {
  id = new Field(this, "id", {
    required: false,
    type: FieldType.int,
    primary: true,
  });
  user_id = new Field(this, "user_id", {
    required: true,
    type: FieldType.int,
  });
  entity_id = new Field(this, "entity_id", {
    required: true,
    type: FieldType.int,
  });
  type = new Field(this, "type", {
    required: true,
    type: FieldType.int,
  });
  title = new Field(this, "title", {
    required: false,
    type: FieldType.string,
  });
  short_desc = new Field(this, "short_desc", {
    required: false,
    type: FieldType.string,
  });
  text = new Field(this, "text", {
    required: false,
    type: FieldType.string,
  });
  media_id = new Field(this, "media_id", {
    required: false,
    type: FieldType.int,
  });
  created_at = new Field(this, "created_at", {
    required: false,
    type: FieldType.date,
    pseudo: true,
  });
  updated_at = new Field(this, "updated_at", {
    required: false,
    type: FieldType.string,
    pseudo: true,
  });
  constructor(parent) {
    super(parent);
    makeObservable(this, {
      id: observable,
      user_id: observable,
      entity_id: observable,
      type: observable,
      title: observable,
      short_desc: observable,
      text: observable,
      media_id: observable,
      created_at: observable,
      updated_at: observable,
    });
  }
}
export default ProjectModel;
