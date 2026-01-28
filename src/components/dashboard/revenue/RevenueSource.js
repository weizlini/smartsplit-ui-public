import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image40x40 from "../../../assets/images/dummy_40x40_ffffff_cccccc.png";
import Help from "../../icons/Help";

const RevenueSource = ({ payout }) => {
  const [details, setDetails] = useState(null);
  const [visible, setVisibility] = useState(false);
  return (
    <Row className="investment">
      <Col sm={5}>
        <div className="invest-summary">
          <img src={Image40x40} />
          <div className="flex-col-start">
            <div className="flex-row-center">
              <h4>{payout.artist.name}</h4>
              <span>&ndash;</span>
              <p>{payout.campaign.title}</p>
              <div>
                <Help />
              </div>
            </div>
            <p className="invest-detail">
              {payout.shares}/{payout.total_shares} parts de{" "}
              {(
                (payout.shares / payout.total_shares) *
                payout.split.percentage
              ).toLocaleString("fr-CA")}
              % des revenus de droits d'auteur
            </p>
          </div>
        </div>
      </Col>
      <Col sm={4}>&nbsp;</Col>
      <Col sm={3}>
        <div className="payout-action">
          {payout.status === "available" ? (
            <div className="split-payout">
              {Number(payout.payout).toLocaleString("fr-ca", {
                minimumFractionDigits: 2,
              })}{" "}
              $<div className="payout-details">Voir les détails</div>
            </div>
          ) : null}
          {payout.status === "coming" ? (
            <div className="payout-coming">Versements à venir</div>
          ) : null}
          {payout.status === "finished" ? (
            <div className="payout-finished">Versements terminés</div>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};
export default RevenueSource;
