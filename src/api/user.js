import axios from "axios";
import config from "./config";
import { jwtHeader } from "./core";

/**
 * User CRUD functions
 */
export async function getUser(token) {
  return axios.get(`${config.apiUrl}/user?token=${token}`);
}
export async function registerCreator(data) {
  return axios.post(`${config.apiUrl}/register/creator`, data);
}
export async function registerInvestor(data) {
  return axios.post(`${config.apiUrl}/register/investor`, data);
}
export async function updateUser(data) {
  return axios.patch(`${config.apiUrl}/user`, data, {
    headers: { authorization: jwtHeader() },
  });
}
export async function userInvestments() {
  const response = await axios.get(`${config.apiUrl}/user/investments`, {
    headers: { authorization: jwtHeader() },
  });
  return response.data;
}

export async function userPayouts() {
  const response = await axios.get(`${config.apiUrl}/user/payouts`, {
    headers: { authorization: jwtHeader() },
  });
  return response.data;
}

export async function getUserInteracInfo() {
  const response = await axios.get(`${config.apiUrl}/user/interac-info`, {
    headers: { authorization: jwtHeader() },
  });
  return response.data;
}
export async function saveUserInteracInfo(data) {
  const response = await axios.post(
    `${config.apiUrl}/user/interac-info`,
    data,
    {
      headers: { authorization: jwtHeader() },
    }
  );
  return response.data;
}

export async function createPayoutReceipt(data) {
  const response = await axios.post(`${config.apiUrl}/payouts/receipt`, data, {
    headers: { authorization: jwtHeader() },
  });
  return response.data;
}
