import BaseModel, { Field, FieldType } from "../BaseModel";
import { emailValidator, passwordValidator } from "./validators";

import { makeObservable, observable } from "mobx";
import { getAvailableShares } from "../../api/campaign";

class InvestModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this, {
      campaignId: observable,
      shares: observable,
      accept_risk: observable,
      accept_terms: observable,
    });
  }
  campaignId = new Field(this, "campaignId", {
    required: false,
    type: FieldType.int,
    pseudo: true,
  });
  shares = new Field(this, "shares", {
    required: true,
    type: FieldType.int,
    requiredMessage: "entre le nombre de pars désiré",
    validation: (v) => {
      if (v < 1) return "error:at_least_one";
    },
    asyncValidation: async (v, model) => {
      const availableShares = await getAvailableShares(model.campaignId.value);
      console.log(`${availableShares}`);
      if (availableShares < Number(v))
        return `Il y a seulement ${
          availableShares > 1 ? availableShares : "une"
        } de ${availableShares > 1 ? "parts" : "part"} disponible`;
      return null;
    },
  });
  accept_risk = new Field(this, "accept_risk", {
    required: true,
    type: FieldType.bool,
    requiredMessage: "vous devez accepter le risque",
    validation: (v) => {
      console.log(`the value of v is ${v}`);
    },
  });
  accept_terms = new Field(this, "accept_terms", {
    required: true,
    type: FieldType.bool,
    requiredMessage: "vous devez accepter les termes",
    validation: (v) => {
      console.log(`the value of v is ${v}`);
    },
  });
}

export default InvestModel;
