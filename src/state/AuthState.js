import { action, flow, makeObservable, observable } from "mobx";
import BaseState from "./BaseState/BaseState";
import {
  login,
  logout,
  resetPassword,
  sendPasswordResetEmail,
} from "../api/auth";

/**
 * AuthState class
 *
 * manages and stores the user's token
 * and their roles
 *
 * logging in, logging out, and
 * resetting forgotten password
 *
 * Registration is done in the UserState
 */
class AuthState extends BaseState {
  token = null;
  roles = [];
  isInvestor = false;
  isCreator = false;
  busy = false;
  redirectTo = null;
  setToken(token) {
    this.token = token;
  }
  setRoles(roles) {
    this.roles = roles;
    if (roles.includes("investor")) {
      this.isInvestor = true;
    }
    if (roles.includes("creator")) {
      this.isCreator = true;
    }
  }
  setPostLoginRedirect(url) {
    this.redirectTo = url;
  }

  *logout() {
    try {
      yield logout(this.token);
    } catch (e) {
      console.log(e);
      //return false;
    }
    yield this.root.user.clear();
    this.token = null;
    this.roles = [];
    this.isInvestor = false;
    this.isCreator = false;
    return true;
  }
  *login(email, password): Promise<boolean> {
    this.busy = true;
    let response = null;
    try {
      response = yield login(email, password);
      console.log(response.data);
      this.busy = false;
      let data = response.data;
      console.log(data.data.token);
      this.token = data.data.token;
      yield this.root.user.load();
      return null;
    } catch (e) {
      this.busy = false;
      if (e.response.status === 400) {
        return e.response.data.message;
      }
    }
  }

  *sendPassResetLink(email) {
    this.busy = true;
    try {
      yield sendPasswordResetEmail(email);
    } catch (e) {
      this.busy = false;
      return false;
    }
    this.busy = false;
    return true;
  }

  *resetPassword(password) {
    this.busy = true;
    try {
      yield resetPassword(password);
    } catch (e) {
      this.busy = false;
      return false;
    }
    this.busy = false;
    return true;
  }

  save = {
    token: null,
  };

  constructor(rootStore) {
    super(rootStore);

    makeObservable(this, {
      token: observable,
      roles: observable,
      busy: observable,
      isCreator: observable,
      isInvestor: observable,
      redirectTo: observable,
      login: flow,
      logout: flow,
      sendPassResetLink: flow,
      resetPassword: flow,
      setToken: action,
      setRoles: action,
      setPostLoginRedirect: action,
    });
  }
}

export default AuthState;
