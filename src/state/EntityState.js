import { action, flow, makeObservable, observable, runInAction } from "mobx";
import BaseState from "./BaseState/BaseState";

/**
 * Stores the User's "Entities"
 * it's the user's Groups or Solo projects
 */
class EntityState extends BaseState() {
  list = [];

  constructor(root) {
    super(root);
    makeObservable(this, {
      list: observable,
    });
  }
  async init() {}
}
export default EntityState;
