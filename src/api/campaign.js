import axios from "axios";
import config from "./config";
export async function getCampaign(path): CampaignData {
  const url = `${config.apiUrl}/campaign/${path}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getAvailableShares(campaignId: number): number {
  const url = `${config.apiUrl}/campaign/${campaignId}/available-shares`;
  try {
    const response = await axios.get(url);
    return response.data.shares;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export interface Artist {
  id: number;
  name: string;
  bio: string;
  short_description: string;
}
export interface Campaign {
  id: number;
  title: string;
  short_description: string;
  max_goal: number;
  shares: number;
  date_starts: string;
  date_ends: string;
  url_path: string;
  amount_invested: number;
  shares_invested: number;
  shares_remaining: number;
}
export interface CampaignPage {
  title: string;
  slug: string;
  tab: string;
  text: string;
}
export interface Investor {
  first_name: string;
  last_name: string;
  shares: number;
  amount: number;
  percent: number;
  is_anonymous: boolean;
}
export interface PublicSplit {
  id: number;
  project_id: number;
  percentage: number;
  shares: number;
  share_value: number;
  date_starts: string;
  date_ends: string;
  status: number;
}
export interface CampaignData {
  campaign: Campaign;
  tabs: Array<CampaignPage>;
  artist: Artist;
  investors: Array<Investor>;
  public_split: PublicSplit;
  project: Project;
}
export interface Project {
  id: number;
  user_id: number;
  entity_id: number;
  type: number;
  title: string;
  short_description: string;
  text: string;
}
