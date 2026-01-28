import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import FlowBox from "./FlowBox";
import hands from "../../assets/image/hands.png";
const WithdrawalSuccess = () => {
  return (
    <FlowBox
      next={"Retour au Tableau de Bord"}
      nextUrl="/dashboard/revenue"
      nextDisabled={() => false}
      nextClick={() => true}
      prevHide={true}
    >
      <Row>
        <Col sm={12}>
          <h3>Succès! La transaction à réussi</h3>
          <div
            style={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={hands} />
          </div>
        </Col>
      </Row>
    </FlowBox>
  );
};
export default observer(WithdrawalSuccess);
