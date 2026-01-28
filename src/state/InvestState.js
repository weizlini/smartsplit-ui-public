import { action, flow, makeObservable, observable } from "mobx";
import BaseState from "./BaseState/BaseState";
import InvestModel from "./models/InvestModel";
import { getZumUser } from "../api/zum";
class InvestState extends BaseState {
  constructor(root) {
    super(root);
    makeObservable(this, {
      model: observable,
      isInvesting: observable,
      cancelInvesting: action,
      initInvesting: action,
      zumUser: observable,
      loadZumUser: flow,
    });
  }
  zumUser = null;
  isInvesting = false;
  model: InvestModel = new InvestModel();
  get payInfo() {
    if (this.zumUser) return this.zumUser.CreditCardInformation;
    return null;
  }
  initInvesting(campaignId) {
    this.model.init({ campaignId });
    this.isInvesting = true;
  }
  cancelInvesting() {
    this.isInvesting = false;
    this.model.reset();
  }
  *loadZumUser() {
    const response = yield getZumUser();
    if (response) {
      this.zumUser = response;
    }
  }
}
export default InvestState;
