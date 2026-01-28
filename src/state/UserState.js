import { action, flow, makeObservable, observable, runInAction } from "mobx";
import BaseState from "./BaseState/BaseState";
import {
  getUser,
  registerCreator,
  registerInvestor,
  updateUser,
} from "../api/user";

/**
 * Stores important properties that identify
 * a user, but not the user's authentication
 * state which is stored in the AuthState
 *
 * has methods to create the user
 */
class UserState extends BaseState {
  constructor(rootStore) {
    super(rootStore);
    makeObservable(this, {
      verified: observable,
      first_name: observable,
      last_name: observable,
      profile_pic: observable,
      zum_user_id: observable,
      zum_eft_user_id: observable,
      email: observable,
      load: action,
      update: action,
      clear: action,
      create: flow,
      init: action,
      redirect_url: observable,
      setRedirectUrl: action,
    });
  }
  verified = false;
  first_name = null;
  last_name = null;
  email = null;
  profile_pic = null;
  zum_user_id = null;
  zum_eft_user_id = null;
  save = {
    verified: false,
    first_name: null,
    last_name: null,
    email: null,
    profile_pic: null,
    redirect_url: "/onboarding",
  };
  redirect_url = "/onboarding";
  setRedirectUrl(url) {
    this.redirect_url = url;
  }
  clear() {
    this.verified = false;
    this.first_name = null;
    this.last_name = null;
    this.email = null;
    this.profile_pic = null;
    this.redirect_url = "/dashboard";
  }
  *create(formData, mode) {
    try {
      if (mode === "investor") {
        yield registerInvestor(formData);
      } else {
        yield registerCreator(formData);
      }
      return true;
    } catch (e) {
      console.log(e);
      // TODO: return errors
      return false;
    }
  }
  async load() {
    try {
      let response = await getUser(this.root.auth.token);
      const data = response.data.data;
      console.log("loading user data");
      console.log(data);
      this.verified = data.email_verified_at;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      this.profile_pic = data.profile_pic;
      this.redirect_url = data.redirect_url;
      this.zum_user_id = data.zum_user_id;
      this.zum_eft_user_id = data.zum_eft_user_id;
    } catch (e) {
      this.root.auth.logout();
    }
  }

  async update(data) {
    try {
      await updateUser(data);
    } catch (e) {
      console.log(e.response.data);
      return false;
    }
    runInAction(() => {
      if (data.first_name) this.first_name = data.first_name;
      if (data.last_name) this.last_name = data.last_name;
      if (data.profile_pic) this.artist_name = data.artist_name;
      if (data.artist_name) this.profile_pic = data.profile_pic;
      if (data.zum_user_id) this.zum_user_id = data.zum_user_id;
      if (data.zum_eft_user_id) this.zum_eft_user_id = data.zum_eft_user_id;
    });
    return true;
  }

  async init(...args) {
    this.register();
    // if token load the initial state and exit
    await this.restoreInitialState();
    if (this.root.auth.token) {
      await this.load();
    }
  }
}

export default UserState;
