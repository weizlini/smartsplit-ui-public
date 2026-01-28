import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { useStorePath } from "../../state";
import { useNavigate } from "react-router-dom";

const FlowBox = (props) => {
  const {
    nextUrl,
    next,
    prevUrl,
    prev,
    prevDisabled,
    nextDisabled,
    nextClick,
    prevClick,
    prevHide,
    nextHide,
  } = props;
  const revenueState = useStorePath("revenue");
  const navigate = useNavigate();
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="withdraw-ui">
          {props.children}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="button-row">
          {prevHide ? null : (
            <button
              className="btn"
              disabled={prevDisabled()}
              onClick={() => {
                let success = true;
                if (typeof prevClick === "function") {
                  success = prevClick();
                }
                if (success) {
                  revenueState.cancelWithdrawal();
                  navigate(prevUrl);
                }
              }}
            >
              {prev}
            </button>
          )}
          {nextHide ? null : (
            <button
              className="btn connect_btn"
              disabled={nextDisabled()}
              onClick={() => {
                let success = true;
                if (typeof prevClick === "function") {
                  success = nextClick();
                }
                if (success) {
                  navigate(nextUrl);
                }
              }}
            >
              {next}
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};
export default observer(FlowBox);
