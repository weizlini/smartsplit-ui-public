import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../InvestmentsView.css";
import "./RevenueView.css";
import MoreVertical from "../../icons/MoreVertical";
import Image40x40 from "../../../assets/images/dummy_40x40_ffffff_cccccc.png";
import Help from "../../icons/Help";
import { useNavigate } from "react-router-dom";
import RevenueSource from "./RevenueSource";
import RevenueHistory from "./RevenueHistory";
const RevenueView = ({
  payouts,
  pendingReceipt,
  totalPayout,
  pastReceipts,
}) => {
  console.log(pastReceipts);
  const navigate = useNavigate();
  return (
    <>
      {totalPayout && !pendingReceipt ? (
        <Row>
          <Col xs={12}>
            <div className="payout-top">
              <div className="total-payouts">
                {totalPayout.toLocaleString("fr-CA", {
                  minimumFractionDigits: 2,
                })}{" "}
                $
              </div>
              <div className="top-payout-action">
                <button
                  className="btn connect_btn"
                  disabled={totalPayout === 0}
                  onClick={() => {
                    navigate("/dashboard/revenue/withdraw");
                  }}
                >
                  Retirer mon solde
                </button>
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
      {!pendingReceipt && !totalPayout ? (
        <Row>
          <Col xs={12}>
            <div className="payout-top">
              <div className="total-payouts-sm">
                Presentment vous n'avez pas de nouveau gains.
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
      {pendingReceipt ? (
        <Row>
          <Col xs={12}>
            <div className="payout-top">
              <div className="total-payouts">
                {Number(pendingReceipt.amount).toLocaleString("fr", {
                  minimumFractionDigits: 2,
                })}{" "}
                $
              </div>
              <div className="withdraw-info">
                Ce retrait est en cours, veillez cliquer sur Finir pour
                completer la transaction
              </div>
              <div className="top-payout-action">
                <button
                  className="btn connect_btn"
                  onClick={() => {
                    navigate("/dashboard/revenue/withdraw");
                  }}
                >
                  Finir le retrait
                </button>
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
      <>
        <Row style={{ marginTop: "40px" }}>
          <Col sm={12}>
            <h4>Sources de Revenu</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {payouts.map((payout, index) => (
              <RevenueSource key={`ir-${index}`} payout={payout} />
            ))}
          </Col>
        </Row>
        {pastReceipts.length ? (
          <>
            <Row style={{ marginTop: "40px" }}>
              <Col sm={12}>
                <h4>Historique de paiements</h4>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <RevenueHistory receipts={pastReceipts} />
              </Col>
            </Row>
          </>
        ) : null}
      </>
    </>
  );
};
export default RevenueView;
