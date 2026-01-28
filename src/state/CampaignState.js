import { action, flow, makeObservable, observable, computed } from "mobx";
import BaseState from "./BaseState/BaseState";
import type {
  Artist,
  CampaignData,
  Investor,
  Project,
  PublicSplit,
} from "../api/campaign";
import { getCampaign } from "../api/campaign";
import InvestModel from "./models/InvestModel";
class CampaignState extends BaseState {
  constructor(root) {
    super(root);
    makeObservable(this, {
      busy: observable,
      campaign: observable,
      artist: observable,
      tabs: observable,
      currentTabIndex: observable,
      currentTab: computed,
      split: observable,
      project: observable,
      investors: observable,
      numInvestorPages: computed,
      currentInvestorPage: observable,
      clear: action,
      loadCampaign: flow,
      setCurrentTab: action,
    });
  }
  /// OBSERVABLES
  busy = false;
  campaign: CampaignData = null;
  artist: Artist = null;
  project: Project = null;
  tabs: Array = [];
  currentTabIndex = 0;
  split: PublicSplit = null;
  investors: Array<Investor> = [];
  investorPageLength = 10;
  currentInvestorPage = 1;

  /// COMPUTED
  get numInvestorPages() {
    return Math.ceil(this.investors.length / this.investorPageLength);
  }
  get currentTab() {
    return this.tabs[this.currentTabIndex];
  }

  /// ACTIONS
  clear() {
    this.campaign = null;
    this.artist = null;
    this.project = null;
    this.tabs = [];
    this.currentTabIndex = 0;
    this.split = 0;
    this.investors = [];
    this.currentInvestorPage = 1;
  }
  setCurrentTab(index) {
    if (index < 0) index = 0;
    if (index > this.tabs.length) index = this.tabs.length;
    this.currentTabIndex = index;
  }
  *loadCampaign(campaignUrl) {
    this.busy = true;
    const data: CampaignData = yield getCampaign(campaignUrl);
    console.log(data);
    this.campaign = data.campaign;
    this.investors = data.investors;
    this.tabs = data.tabs;
    this.split = data.public_split;
    this.artist = data.artist;
    this.project = data.project;
    this.currentInvestorPage = 1;
    this.currentTabIndex = 0;
  }
}
export default CampaignState;
