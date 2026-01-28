import React from "react";
import { toJS, makeAutoObservable, runInAction } from "mobx";
import UserState from "./UserState";
import AuthState from "./AuthState";
import MediaState from "./MediaState";
import InvestState from "./InvestState";
import CampaignState from "./CampaignState";
import RevenueState from "./RevenueState";

/**
 * This index file creates a singular instance
 * of the main RootStore, initializes all
 * the sub stores.
 *
 * It creates a React Context that stores
 * the root store and exposes 2 hooks
 * that can be used to access the stores
 * from within a React Component
 *
 * the most commonly used one is
 * getStorePath. (see below)
 *
 * (remember that all React components
 * must be wrapped in an observer() function
 * to react to state changes)
 */

/**
 * the Root store object.
 */
export class RootStore {
  auth = new AuthState(this);
  user = new UserState(this);
  media = new MediaState(this);
  invest = new InvestState(this);
  campaign = new CampaignState(this);
  revenue = new RevenueState(this);
  constructor() {
    makeAutoObservable(this);
  }
  initialized = false;
  value = 0;

  setValue(n) {
    this.value = n;
  }

  async init() {
    await this.auth.init();
    await this.user.init();
    await this.media.init();
    await this.invest.init();
    await this.campaign.init();
    await this.revenue.init();
    runInAction(() => {
      this.initialized = true;
    });
  }
}

/**
 * le context react qui permet l'accès globale
 * @type {RootStore}
 */

const stores = new RootStore();
stores.init();
export const storesContext = React.createContext(stores);
window.state = stores;
window.toJS = toJS;
export default stores;
/**
 * Le hook principal pour accéder aux stores
 *
 * utlitisation:
 * const {test,bla} = useStore();
 *
 * @return {RootStore} l'instance du Root Store
 */
export const useStores = () => React.useContext(storesContext);

/**
 * Un hook pour accéder à des observables plus profondement dans l'arborescence
 *
 * utlitisation:
 * const {level1} = useStorePath("test","deep","level1");
 *
 * @param paths une série d'arguments variable en string qui denote le path dans l'arborescene
 * @return {*}
 */
export const useStorePath = (...paths) => {
  const stores = useStores();
  let error = false;
  let current = stores;
  paths.forEach((path) => {
    if (current[path]) {
      current = current[path];
    } else {
      error = true;
    }
  });
  //if (error) console.error("useStorePath: path was invalid")
  return error ? null : current;
};
