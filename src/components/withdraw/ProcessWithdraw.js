import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import FlowBox from "./FlowBox";
import type RevenueState from "../../state/RevenueState";
import { useStorePath } from "../../state";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { set } from "mobx";

const ProcessWithdraw = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const { withdrawalFlowActive, busy } = revenueState;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const makeTransaction = async () => {
    const success = await revenueState.doWithdrawal();
    if (success) {
      navigate("/dashboard/revenue/withdraw/success");
    } else {
      navigate("/dashboard/revenue/withdraw/error");
    }
  };
  useEffect(() => {
    if (!withdrawalFlowActive) navigate("/dashboard/revenue");
    setLoading(false);
    makeTransaction().then();
  }, []);
  return (
    <FlowBox
      prev={"Reviser la méthode"}
      prevUrl="/dashboard/revenue/withdraw/confirm"
      next={"Continuer"}
      nextUrl="/dashboard/revenue"
      nextDisabled={() => true}
      nextClick={() => true}
      prevDisabled={() => false}
      prevClick={() => true}
    >
      <>
        <h3>Nous transférons votre argent....</h3>
        {busy || loading ? (
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
        ) : null}
      </>
    </FlowBox>
  );
};
export default observer(ProcessWithdraw);
