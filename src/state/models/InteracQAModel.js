import BaseModel, { Field, FieldType } from "../BaseModel";
import { makeObservable, observable } from "mobx";
import { interacAnswer, interacQuestion } from "./validators";

class InteracQAModel extends BaseModel {
  interac_question = new Field(this, "interac_question", {
    required: true,
    validation: interacQuestion,
    format: (v) => v.trimStart(),
  });
  interac_answer = new Field(this, "interac_answer", {
    required: true,
    validation: interacAnswer,
    format: (v) => v.trimStart(),
  });

  constructor(parent) {
    super(parent);
    makeObservable(this, {
      interac_question: observable,
      interac_answer: observable,
    });
  }
}

export default InteracQAModel;
