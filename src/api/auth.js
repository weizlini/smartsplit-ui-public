import axios from "axios";
import config from "./config";

/**
 * contains API functions for various authentication calls to the API
 */
export async function login(email, password) {
  return axios.post(config.apiUrl + "/login", { email, password });
}
export async function logout(token) {
  return axios.get(config.apiUrl + `/logout?token=${token}`);
}

export async function isEmailUnique(email) {
  try {
    await axios.post(config.apiUrl + "/check", { email });
    return true;
  } catch (e) {
    return false;
  }
}
export async function sendPasswordResetEmail(email) {
  try {
    await axios.post(config.apiUrl + "/forgot-password", { email });
    return true;
  } catch (e) {
    return false;
  }
}

export async function sendVerificationCode(code) {
  try {
    await axios.post(config.apiUrl + "/verify", { code });
    return true;
  } catch (e) {
    return false;
  }
}
export async function sendPassResetVerificationCode(code) {
  try {
    const response = await axios.post(config.apiUrl + "/verify", { code });
    return response.data;
  } catch (e) {
    return false;
  }
}

export async function resetPassword(data) {
  try {
    await axios.post(config.apiUrl + "/reset-password", data);
    return true;
  } catch (e) {
    return false;
  }
}
