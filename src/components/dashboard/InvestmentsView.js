import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./InvestmentsView.css";
import MoreVertical from "../icons/MoreVertical";
import Image40x40 from "../../assets/images/dummy_40x40_ffffff_cccccc.png";
import Help from "../icons/Help";
const Investment = ({ investment }) => {
  return (
    <Row className="investment">
      <Col sm={5}>
        <div className="invest-summary">
          <img src={Image40x40} />
          <div className="flex-col-start">
            <div className="flex-row-center">
              <h4>{investment.artist.name}</h4>
              <span>&ndash;</span>
              <p>{investment.campaign.title}</p>
              <div>
                <Help />
              </div>
            </div>
            <p className="invest-detail">
              ${investment.amount} pour{" "}
              {Number(
                (investment.shares / investment.total_shares) *
                  investment.split.percentage
              ).toFixed(2)}
              % des revenus de droits d'auteur
            </p>
          </div>
        </div>
      </Col>
      <Col sm={4}>
        <div className="campaign-summary">
          <div className="flex-column">
            <div className="flex-row">
              <h5>Campagne en cours</h5>
              <p>
                {Math.round(
                  (investment.total_invested / investment.total_shares) * 100
                )}{" "}
                % de l’objectif atteint.
              </p>
            </div>
            <div className="invest-progressbar">
              <div
                className="invest-progress"
                style={{
                  width: `${(
                    (investment.total_invested / investment.total_shares) *
                    100
                  ).toFixed(2)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <div className="invest-action">
          <button className="btn">Promouvoir</button>
          <div className="action-icon" onClick={() => {}}>
            <MoreVertical />
          </div>
        </div>
      </Col>
    </Row>
  );
};
const InvestmentsView = ({ investments }) => {
  return (
    <Row>
      <Col sm={12}>
        {investments.map((investment, index) => (
          <Investment key={`ir-${index}`} investment={investment} />
        ))}
      </Col>
    </Row>
  );
};
export default InvestmentsView;
