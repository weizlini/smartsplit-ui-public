import { Container, Row, Col, Modal } from "react-bootstrap";
import Header, { CampaignHeader } from "../components/Header";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStorePath } from "../state";
import type CampaignState from "../state/CampaignState";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { PageLoader } from "../components/Loader";
import "./Campaign.css";
import "./InvestCampaign.css";
import InvestState from "../state/InvestState";
import PageTemplate from "../components/PageTemplate";
import type AuthState from "../state/AuthState";
const InvestCampaign = () => {
  let { url } = useParams();
  const authState: AuthState = useStorePath("auth");
  const campaignState: CampaignState = useStorePath("campaign");
  const { campaign, split, artist, investors } = campaignState;
  const investState: InvestState = useStorePath("invest");
  const { isInvesting } = investState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.token) {
      navigate(`/campaign/${url}`);
    }
  });
  useEffect(() => {
    console.log("effect1");
    if (!campaign) {
      campaignState.loadCampaign(url);
    }
  }, [campaign]);
  useEffect(() => {
    if (campaign) {
      if (!isInvesting) {
        console.log(
          `initializing invest model with campaign id = ${campaign.id}`
        );
        investState.initInvesting(campaign.id);
      }
    }
  }, [isInvesting, campaign]);
  if (!campaign) return <PageLoader />;
  return (
    <PageTemplate>
      <Container style={{ marginTop: "30px", borderBottom: "1px solid #eee" }}>
        {/*<p>is Xlarge : {screen.isXLarge ? "yes" : "no"}</p>
        <p>is large : {screen.isLarge ? "yes" : "no"}</p>
        <p>is Med : {screen.isMed ? "yes" : "no"}</p>
        <p>is Small : {screen.isSmall ? "yes" : "no"}</p>
        <p>is XSmall : {screen.isXSmall ? "yes" : "no"}</p>*/}
        <Row>
          <h1 className="titre-acheter">Achat de parts dans la campagne</h1>
        </Row>
        <Row>
          <Col sm={6}>
            <h2 className="campaign-title">{artist.name}</h2>
          </Col>
          <Col sm={6}>
            <h2
              className="campaign-title"
              style={{ textAlign: "right" }}
              dangerouslySetInnerHTML={{ __html: campaign.title }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <div
              className="campaign-top-box bg_fa"
              style={{ marginTop: 0, minHeight: "95px" }}
            >
              <div className="campaign-dates">Du 15 MARS au 15 avril 2023</div>
              <div className="campaign-nums">100&nbsp;000&nbsp;$</div>
              <div className="camp-progressbar">
                <div
                  className="camp-progress"
                  style={{
                    width: `${(
                      (campaign.shares_invested / split.shares) *
                      100
                    ).toFixed(1)}%`,
                  }}
                />
              </div>
              <div className="camp-progress-text">
                <div className="camp-amnt-raised">
                  {campaign.amount_invested} $
                </div>
                <div className="camp-label">&nbsp;&nbsp;amassés</div>
                <div className="camp-percent">
                  {((campaign.shares_invested / split.shares) * 100).toFixed(2)}
                  %
                </div>
              </div>
            </div>
          </Col>
          <Col sm={2}>
            <div className="campaign-info-box bg_fa">
              <div className="campaign-nums">{campaign.shares_remaining}</div>
              <div className="camp-label">parts disponibles</div>
            </div>
          </Col>
          <Col sm={2}>
            <div className="campaign-info-box bg_fa">
              <div className="campaign-nums">100 $</div>
              <div className="camp-label">par part</div>
            </div>
          </Col>
          <Col sm={2}>
            <div className="campaign-info-box bg_fa">
              <div className="campaign-nums">{investors.length}</div>
              <div className="camp-label">contributeurs</div>
            </div>
          </Col>
          <Col sm={2}>
            <div className="campaign-info-box bg_fa">
              <div className="campaign-nums">57</div>
              <div className="camp-label">jours restant</div>
            </div>
          </Col>
          <Row className="mt-4" style={{ position: "relative" }}></Row>
        </Row>
      </Container>
      <Container className="invest-flow">
        <Outlet />
      </Container>
    </PageTemplate>
  );
};
export default observer(InvestCampaign);
/*
{

 */
