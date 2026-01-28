import axios from "axios";
import config from "./config";
import { jwtHeader } from "./core";

export const investCampaign = async (campaignId, data) => {
  const url = `${config.apiUrl}/campaign/${campaignId}/invest`;
  try {
    const response = await axios.post(url, data, {
      headers: { authorization: jwtHeader() },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
