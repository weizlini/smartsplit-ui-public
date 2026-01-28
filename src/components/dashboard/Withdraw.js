import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./Withdraw.css";
import { useStorePath } from "../../state";
import RevenueState from "../../state/RevenueState";
const Withdraw = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const { pendingReceipt } = revenueState;
  return (
    <>
      {pendingReceipt ? (
        <Row className="withdraw-content">
          <Col xs={12}>
            <h2>
              Retirer un solde de{" "}
              {pendingReceipt.amount.toLocaleString("fr-CA")}$
            </h2>
          </Col>
        </Row>
      ) : null}
      <div className="withdraw-ui-container">
        <Outlet />
      </div>
    </>
  );
};
export default observer(Withdraw);
