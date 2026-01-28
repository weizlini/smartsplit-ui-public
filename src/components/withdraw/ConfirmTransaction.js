import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import FlowBox from "./FlowBox";
import type RevenueState from "../../state/RevenueState";
import { useStorePath } from "../../state";
import type UserState from "../../state/UserState";

const ConfirmTransaction = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const { withdrawModel, totalPayout, pendingReceipt } = revenueState;
  const userState: UserState = useStorePath("user");
  return (
    <FlowBox
      prev={"details de la transaction"}
      prevUrl="/dashboard/revenue/withdraw/method-details"
      next={"confirmer"}
      nextUrl="/dashboard/revenue/withdraw/process"
      nextDisabled={() => false}
      nextClick={() => true}
      prevDisabled={() => false}
      prevClick={() => true}
    >
      <Row>
        <Col sm={8}>total payouts</Col>
        <Col sm={4}>
          {totalPayout.toLocaleString("fr-CA", {
            maximumFractionDigits: 2,
            currencySign: "$",
            currency: "CAD",
          })}
        </Col>
      </Row>
      <Row>
        <Col sm={8}>SmartSplit Fee</Col>
        <Col sm={4}></Col>
      </Row>
      <Row>
        <Col sm={8}>Montant Finale</Col>
        <Col sm={4}>$</Col>
      </Row>
    </FlowBox>
  );
};
export default observer(ConfirmTransaction);
