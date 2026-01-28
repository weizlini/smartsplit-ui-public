import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator, passwordValidator } from "./validators";

import { makeObservable, observable } from "mobx";
class CampaignModel extends BaseModel {
  id = new Field(this, "id", {
    required: true,
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
  project_id = new Field(this, "project_id", {
    required: true,
    type: FieldType.int,
  });
  title = new Field(this, "title", {
    required: true,
    type: FieldType.string,
  });
  short_desc = new Field(this, "short_desc", {
    required: true,
    type: FieldType.string,
  });
  text = new Field(this, "text", {
    required: false,
    type: FieldType.string,
  });
  url = new Field(this, "url", {
    required: false,
    type: FieldType.string,
    pseudo: true,
  });
  date_starts = new Field(this, "date_starts", {
    required: true,
    type: FieldType.date,
  });
  date_ends = new Field(this, "date_ends", {
    required: true,
    type: FieldType.date,
  });
  media_id = new Field(this, "media_id", {
    required: false,
    type: FieldType.int,
  });
  min_goal = new Field(this, "min_goal", {
    required: true,
    type: FieldType.int,
  });
  max_goal = new Field(this, "max_goal", {
    required: true,
    type: FieldType.int,
  });
  raised = new Field(this, "raised", {
    required: false,
    type: FieldType.int,
  });
  shares = new Field(this, "shares", {
    required: true,
    type: FieldType.int,
  });

  is_live = new Field(this, "is_live", {
    required: false,
    type: FieldType.int,
    default: 0,
  });
  is_closed = new Field(this, "is_closed", {
    required: false,
    type: FieldType.int,
    default: 0,
  });
  created_at = new Field(this, "created_at", {
    required: false,
    type: FieldType.date,
  });
  updated_at = new Field(this, "updated_at", {
    required: false,
    type: FieldType.date,
  });

  constructor(parent) {
    super(parent);
    makeObservable(this, {
      id: observable,
      user_id: observable,
      entity_id: observable,
      project_id: observable,
      url: observable,
      title: observable,
      short_desc: observable,
      text: observable,
      date_starts: observable,
      date_ends: observable,
      min_goal: observable,
      max_goal: observable,
      media_id: observable,
      raised: observable,
      shares: observable,
      is_live: observable,
      is_closed: observable,
      created_at: observable,
      updated_at: observable,
    });
  }
}
export default CampaignModel;
