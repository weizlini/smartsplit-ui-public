import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import type RevenueState from "../../state/RevenueState";
import { useStorePath } from "../../state";
import { useNavigate } from "react-router-dom";
import FlowBox from "./FlowBox";
import { Loader, PageLoader } from "../Loader";
import type UserState from "../../state/UserState";
import { getAddEftProfileToken } from "../../api/zum";
import { toJS } from "mobx";
import "./SelectWithdrawMethod.css";
import { FaEye, FaPen } from "react-icons/fa";
import { interacQuestion } from "../../state/models/validators";
const SelectWithdrawMethod = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const userState: UserState = useStorePath("user");
  const {
    loaded,
    totalPayout,
    pendingReceipt,
    paymentInfoLoaded,
    withdrawalFlowActive,
    interacQAFlowActive,
    availableMethods,
    withdrawModel,
    interacModel,
    cardInfo,
    interacAnswer,
    interacQuestion,
  } = revenueState;
  const { email } = userState;
  const navigate = useNavigate();
  const [answerVisible, setAnswerVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [eftProfileCreated, setEftProfileCreated] = useState(false);
  const [SDKResponse, setSDKResponse] = useState(null);
  //const [pageReady,setPageReady] = useState(false)
  const methods = {
    Eft: "Transfer direct (EFT)",
    Interac: `Interac`,
    VisaDirectPush: "Visa Direct",
  };
  // effect to redirect user if no payouts are available back to revenue page
  // state is loaded lazy, so first we check and see if it has even been loaded
  // we also load a token if we need to open up a zūm sdk window
  useEffect(() => {
    // if there are no payouts to do and no pending receipt redirect to revenue dashboard
    if (!totalPayout && !pendingReceipt) {
      navigate("/dashboard/revenue");
    }
    console.log(availableMethods);

    if (!paymentInfoLoaded) {
      revenueState.loadPaymentProfile().then();
    } else {
      if (!withdrawalFlowActive) {
        revenueState.startWithdrawal().then((started) => {
          if (!started) {
            navigate("/dashboard/revenue");
          }
        });
      }
    }
  }, [paymentInfoLoaded, withdrawalFlowActive]);
  console.log(toJS(revenueState));
  if (!paymentInfoLoaded && !withdrawalFlowActive)
    return (
      <>
        {" "}
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5} className="withdraw-ui">
            <h3>Sélectionne une méthode de retrait</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader size={50} />
            </div>
          </Col>
        </Row>
      </>
    );
  return (
    <>
      <FlowBox
        prev={"Annuler"}
        prevUrl="/dashboard/revenue"
        next={"Continuer"}
        nextUrl="/dashboard/revenue/withdraw/method-details"
        nextDisabled={() => {
          return !withdrawModel.method.value;
        }}
        nextClick={() => true}
        prevDisabled={() => false}
        prevClick={() => true}
      >
        <>
          <h3>Sélectionne une méthode de retrait</h3>
          {Object.keys(methods).map((key, index) => {
            return revenueState.isMethodAvailable(key) || key === "Eft" ? (
              <div
                key={`r${index}`}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  onChange={(e) => {
                    withdrawModel.method.setValue(key);
                  }}
                  checked={withdrawModel.method.value === key}
                  name="method"
                />
                <label>{methods[key]}</label>{" "}
              </div>
            ) : null;
          })}
          {/*
            Here we place secondary forms or info related to method they chose.
            for EFT : we need to create another zum payment profile
          */}
        </>
      </FlowBox>
    </>
  );
};
export default observer(SelectWithdrawMethod);
