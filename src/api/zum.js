import axios from "axios";
import config from "./config";
import { jwtHeader } from "./core";
export async function getAddPaymentProfileToken() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/zum/connect/addPaymentProfileToken`,
      {
        headers: { authorization: jwtHeader() },
      }
    );
    const data = response.data;
    if (data.success === true) {
      return data.token;
    }
  } catch (e) {
    return false;
  }
}
export async function getAddEftProfileToken() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/zum/connect/addEftProfileToken`,
      {
        headers: { authorization: jwtHeader() },
      }
    );
    const data = response.data;
    if (data.success === true) {
      return data.token;
    }
  } catch (e) {
    return false;
  }
}

export async function getZumUser() {
  try {
    const response = await axios.get(`${config.apiUrl}/zum/getUser`, {
      headers: { authorization: jwtHeader() },
    });
    const data = response.data;
    if (data.success === true) {
      return data.zum_user;
    }
  } catch (e) {
    return false;
  }
}
export async function getZumEftUser() {
  try {
    const response = await axios.get(`${config.apiUrl}/zum/getEftUser`, {
      headers: { authorization: jwtHeader() },
    });
    const data = response.data;
    if (data.success === true) {
      return data.zum_user;
    }
  } catch (e) {
    return false;
  }
}

export async function setInteracInfo(postData) {
  console.log(postData);
  const response = await axios.post(
    `${config.apiUrl}/zum/interac-info`,
    postData,
    {
      headers: { authorization: jwtHeader() },
    }
  );
  const data = response.data;
  if (data.success === true) {
    return true;
  }

  // console.log(e);
  return false;
}
export async function getInteracInfo() {
  try {
    const response = await axios.get(`${config.apiUrl}/zum/interac-info`, {
      headers: { authorization: jwtHeader() },
    });
    return response.data;
  } catch (e) {
    return false;
  }
}
export async function deleteUser() {
  try {
    const response = await axios.post(`${config.apiUrl}/zum/deleteUser`, [], {
      headers: { authorization: jwtHeader() },
    });
    const data = response.data;
    if (data.success === true) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function payRevenueReceipt(postData) {
  console.log(postData);
  const response = await axios.post(
    `${config.apiUrl}/zum/pay-receipt`,
    postData,
    {
      headers: { authorization: jwtHeader() },
    }
  );
  const data = response.data;
  if (data.success === true) {
    return true;
  }

  // console.log(e);
  return false;
}
