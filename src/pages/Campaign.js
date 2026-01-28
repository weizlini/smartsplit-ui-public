import { Container, Row, Col, Modal } from "react-bootstrap";
import Header, { CampaignHeader } from "../components/Header";
import { observer } from "mobx-react-lite";
import "./Campaign.css";
import React, { useEffect, useState } from "react";
import { useStorePath } from "../state";
import type UserState from "../state/UserState";
import type CampaignState from "../state/CampaignState";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PageLoader } from "../components/Loader";
import Contributors from "../components/campaigns/Contributors";
import type AuthState from "../state/AuthState";
import PrePaymentModal from "../components/modals/PrePaymentModal";
import PageTemplate from "../components/PageTemplate";
import CampaignPage from "../components/campaigns/CampaignPage";

const CampaignView = () => {
  const user: UserState = useStorePath("user");
  const auth: AuthState = useStorePath("auth");
  let { url } = useParams();
  const campaignState: CampaignState = useStorePath("campaign");
  const { campaign, split, tabs, currentTab, artist, investors } =
    campaignState;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    user.setRedirectUrl(`/campaign/${url}/invest`);
  });
  useEffect(() => {
    console.log("effect2");
    if (!campaign) {
      campaignState.loadCampaign(url);
    }
  }, [campaign]);
  if (!campaign) return <PageLoader />;
  return (
    <PageTemplate>
      <Container style={{ marginTop: "60px" }}>
        {/*<p>is Xlarge : {screen.isXLarge ? "yes" : "no"}</p>
        <p>is large : {screen.isLarge ? "yes" : "no"}</p>
        <p>is Med : {screen.isMed ? "yes" : "no"}</p>
        <p>is Small : {screen.isSmall ? "yes" : "no"}</p>
        <p>is XSmall : {screen.isXSmall ? "yes" : "no"}</p>*/}
        <Row>
          <Col sm={12}>
            <h1>{artist.name}</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12} md={12} lg={8}>
            <h2
              className="campaign-title"
              dangerouslySetInnerHTML={{ __html: campaign.title }}
            />
            <iframe
              className="camp-vid"
              src="https://www.youtube.com/embed/M-_YJuy-10Q?controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Col>
          <Col sm={12} md={12} lg={4} className="camp-summary">
            <Row>
              <Col sm={12}>
                <button
                  className="btn connect_btn campaign-btn"
                  onClick={() => {
                    if (auth.token) {
                      navigate(`/campaign/${campaign.url_path}/invest`);
                    } else {
                      setVisible(true);
                    }
                  }}
                >
                  ACHETER DES PARTS DE REVENUS
                </button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="campaign-top-box bg_fa">
                  <div className="campaign-dates">
                    Du 15 MARS au 15 avril 2023
                  </div>
                  <div className="campaign-objectives">
                    Objectif de la campagne
                  </div>
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
                      {(
                        (campaign.shares_invested / split.shares) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-4" style={{ position: "relative" }}>
              <Col sm={6}>
                <div className="campaign-info-box bg_fa">
                  <div className="campaign-nums">
                    {campaign.shares_remaining}
                  </div>
                  <div className="camp-label">parts disponibles</div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="campaign-info-box bg_fa">
                  <div className="campaign-nums">100 $</div>
                  <div className="camp-label">par part</div>
                </div>
              </Col>
              <div className="camp-X">&times;</div>
            </Row>
            <Row className="mt-4" style={{ position: "relative" }}>
              <Col sm={6}>
                <div className="campaign-info-box bg_fa">
                  <div className="campaign-nums">{investors.length}</div>
                  <div className="camp-label">contributeurs</div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="campaign-info-box bg_fa">
                  <div className="campaign-nums">57</div>
                  <div className="camp-label">jours restant</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="campaign-tabs">
              {tabs.map((t, index) => (
                <div
                  key={`tab${index}`}
                  className={`camp-tab ${
                    currentTab.tab === t.tab ? "active" : ""
                  }`}
                  onClick={() => {
                    //console.log(index);
                    campaignState.setCurrentTab(index);
                    // console.log(tabs[index]);
                  }}
                >
                  {t.title}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="campaign-page">
              {currentTab.tab === "Contributeurs" ? (
                <Contributors investors={investors} />
              ) : (
                <CampaignPage html={currentTab.text} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <PrePaymentModal
        visible={visible}
        url={url}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageTemplate>
  );
};
export default observer(CampaignView);
/*
{

 */
