import {
  action,
  flow,
  makeObservable,
  observable,
  runInAction,
  computed,
} from "mobx";
import BaseState from "./BaseState/BaseState";
import BankAccountModel from "./models/BankAccountModel";
import WithdrawModel from "./models/WithdrawModel";
import { createPayoutReceipt, userPayouts } from "../api/user";
import {
  payRevenueReceipt,
  getInteracInfo,
  getZumEftUser,
  getZumUser,
  setInteracInfo,
} from "../api/zum";
import InteracQAModel from "./models/InteracQAModel";

export interface ZumCardInfo {
  Id: string;
  FirstName: string;
  LastName: string;
  Number: string;
  NumberMasked: string;
  ExpireMonth: string;
  ExpireYear: string;
  AddressLine1: string;
  AddressLine2?: string;
  AddressPostalCode: string;
  AddressCountry: string;
  AddressCity: string;
  AddressState: string;
  BrandName: string;
  VerifyCreditCardStatus: string;
  AggregationStatus: string;
  VisaDirectCardType: string;
  FundingSourceStatus: string;
}
export interface ZumBankAccount {
  Institution: string;
  InstitutionNumber: string;
  TransitNumber: string;
  AccountNumber: string;
}
class RevenueState extends BaseState {
  constructor(rootStore) {
    super(rootStore);
    makeObservable(this, {
      cardInfo: observable,
      totalPayout: observable,
      payouts: observable,
      pendingReceipt: observable,
      pastReceipts: observable,
      withdrawModel: observable,
      interacModel: observable,
      withdrawalFlowActive: observable,
      interacQAFlowActive: observable,
      interacQuestion: observable,
      interacAnswer: observable,
      availableMethods: observable,
      loaded: observable,
      bankInfo: observable,
      paymentInfoLoaded: observable,
      busy: observable,
      load: flow,
      loadPayouts: flow,
      loadPaymentInfo: flow,
      loadPaymentProfile: flow,
      loadEftInfo: flow,
      loadInteracInfo: flow,
      saveInteracInfo: flow,
      doWithdrawal: flow,
      createReceipt: flow,
      startWithdrawal: flow,
      cancelWithdrawal: action,
      startInteracQA: action,
      cancelInteracQA: action,
      bankAccountNumberMasked: computed,
      eftAvailable: computed,
      interacReady: computed,
    });
  }

  //-------------
  // OBSERVABLES
  //-------------
  cardInfo: ZumCardInfo = null;
  totalPayout = 0;
  payouts = [];
  pendingReceipt = null;
  pastReceipts = [];
  withdrawModel: WithdrawModel = new WithdrawModel();
  interacModel: InteracQAModel = new InteracQAModel();
  bankInfo: ZumBankAccount = null;
  availableMethods = null;
  interacQuestion = "";
  interacAnswer = "";
  busy = false;
  loaded = false;
  paymentInfoLoaded = false;
  withdrawalFlowActive = false;
  interacQAFlowActive = false;

  //-----------
  // COMPUTED
  //-----------
  get interacReady() {
    return !!(this.interacQuestion && this.interacAnswer);
  }
  isMethodAvailable(key) {
    if (key === "Eft" && this.eftAvailable) return true;
    else return this.availableMethods[key];
  }
  get eftAvailable() {
    return this.bankInfo != null;
  }

  get bankAccountNumberMasked() {
    if (this.loaded && this.eftAvailable) {
      const len = this.bankInfo.AccountNumber.length;
      if (len) {
        return (
          "***********" + this.bankInfo.AccountNumber.substring(len - 4, len)
        );
      } else {
        return "unknown";
      }
    } else {
      return "";
    }
  }

  // ---------------
  // FLOWS
  // ---------------
  *load() {
    yield this.loadPayouts();
    this.loaded = true;
  }
  *loadPaymentProfile() {
    yield this.loadPaymentInfo();
    yield this.loadInteracInfo();
    yield this.loadEftInfo();
    this.paymentInfoLoaded = true;
  }
  *loadInteracInfo() {
    const data = yield getInteracInfo();
    if (data.success) {
      this.interacQuestion = data.interac_question;
      this.interacAnswer = data.interac_answer;
    } else {
      this.interacQuestion = "";
      this.interacAnswer = "";
    }
  }
  *saveInteracInfo(data) {
    //const data = this.interacModel.toJS();
    console.log(data);
    const success = yield setInteracInfo(data);
    if (success) {
      this.interacQuestion = data.interac_question;
      this.interacAnswer = data.interac_answer;
      this.interacQAFlowActive = false;
      return true;
    }
    return false;
  }
  *loadPayouts() {
    if (this.root.auth.token) {
      const response = yield userPayouts();
      console.log(JSON.stringify(response, null, 2));
      this.payouts = response.payouts;
      this.totalPayout = response.totalPayout;
      this.pendingReceipt = response.pendingReceipt;
      this.pastReceipts = response.pastReceipts;
    }
  }
  *loadPaymentInfo() {
    if (this.root.user.zum_user_id) {
      const zum_user = yield getZumUser();
      this.cardInfo = zum_user.CreditCardInformation;
      this.availableMethods = zum_user.TransactionMethodsAvailable;
    }
  }
  *loadEftInfo() {
    console.log("eft zum user " + this.root.user.zum_eft_user_id);
    if (this.root.user.zum_eft_user_id) {
      const zum_user = yield getZumEftUser();
      this.bankInfo = zum_user.BankAccountInformation;
    }
  }
  *startWithdrawal() {
    let success = false;
    if (!this.pendingReceipt && this.totalPayout) {
      success = yield this.createReceipt();
      if (!success) return false;
    }
    if (this.pendingReceipt) {
      success = true;
      this.withdrawModel = new WithdrawModel();
      this.withdrawModel.init({
        amount: this.totalPayout,
        receiptId: this.pendingReceipt.id,
      });
      this.withdrawalFlowActive = true;
    }
    return success;
  }
  *doWithdrawal() {
    this.busy = true;
    const data = {
      receiptId: this.withdrawModel.receiptId.value,
      transactionMethod: this.withdrawModel.method.value,
    };
    const response = yield payRevenueReceipt(data);
    this.busy = false;
    return response;
  }
  *createReceipt() {
    if (!this.pendingReceipt && this.totalPayout > 0) {
      try {
        const response = yield createPayoutReceipt({
          amount: this.totalPayout,
        });
        if (response.success) {
          this.pendingReceipt = response.receipt;
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }

  // ---------------
  // ACTIONS
  // ---------------

  cancelWithdrawal() {
    this.withdrawModel.reset();
    this.withdrawalFlowActive = false;
  }
  startInteracQA() {
    this.interacModel = new InteracQAModel();
    this.interacModel.init({
      interac_question: this.interacQuestion,
      interac_answer: this.interacAnswer,
    });
    this.interacQAFlowActive = true;
  }
  cancelInteracQA() {
    this.interacQAFlowActive = false;
  }
}

export default RevenueState;
