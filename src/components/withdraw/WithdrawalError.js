import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import FlowBox from "./FlowBox";

const WithdrawalError = () => {
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
          <h3>La Transaction à échoué</h3>
          <p>La méthode choisi n'a pas réussi</p>
        </Col>
      </Row>
    </FlowBox>
  );
};
export default observer(WithdrawalError);
