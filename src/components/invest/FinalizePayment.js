import { Col, Row } from "react-bootstrap";
import { formatNumber } from "../../utilities";
import { observer } from "mobx-react-lite";
import { useStorePath } from "../../state";
import React, { useEffect, useState } from "react";
import type InvestState from "../../state/InvestState";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoader } from "../Loader";
import type CampaignState from "../../state/CampaignState";
import type { Campaign, PublicSplit } from "../../api/campaign";
import { investCampaign } from "../../api/invest";
import PaymentPendingModal from "../modals/PaymentPendingModal";

const FinalizePayment = () => {
  const investState: InvestState = useStorePath("invest");
  const { payInfo, isInvesting, model } = investState;
  const campaignState: CampaignState = useStorePath("campaign");
  const split: PublicSplit = campaignState.split;
  const campaign: Campaign = campaignState.campaign;
  const navigate = useNavigate();
  const { url } = useParams();
  const [busy, setBusy] = useState(false);
  const payInvoice = async () => {
    setBusy(true);
    try {
      const data = {
        shares: model.shares.value,
        amount: model.shares.value * split.share_value,
        is_anonymous: false,
      };
      const response = await investCampaign(model.campaignId.value, data);
      console.log(response);
      navigate(`/campaign/${url}/invest/success`);
    } catch (e) {
      console.log("error making payment");
      navigate(`/campaign/${url}/invest/error`);
      console.log(e);
    }
  };
  useEffect(() => {
    if (!isInvesting) {
      navigate(`/campaign/${url}/invest`);
    }
  }, [isInvesting]);
  useEffect(() => {
    const loadPayInfo = async () => {
      await investState.loadZumUser();
    };
    if (!payInfo) {
      loadPayInfo().then();
    }
  }, [payInfo]);
  if (!payInfo) return <PageLoader />;
  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">
            Révisez les informations avant de payer
          </h2>
        </Col>
      </Row>
      <div className="invest-content">
        <Row className="justify-content-center">
          <Col sm={6}>
            <h3>Méthode de paiement</h3>
            <p>
              {payInfo.BrandName} {payInfo.NumberMasked}
            </p>
            <h3>Votre Investissement</h3>
            <p>
              <strong>{model.shares.value}</strong> part
              {model.shares.value > 1 ? "s" : ""} à{" "}
              <strong>${formatNumber(split.share_value)}.00 chacune </strong>
            </p>
            <h3>Montant à payer</h3>
            <p>
              <strong>
                {(model.shares.value * split.share_value).toLocaleString("fr", {
                  minimumFractionDigits: 2,
                })}
                $
              </strong>
            </p>
          </Col>
        </Row>
      </div>
      <Row className="justify-content-center">
        <Col sm={6} className="button-row">
          <button
            className="btn"
            onClick={() => {
              investState.cancelInvesting();
            }}
          >
            Annuler
          </button>
          <button
            className="btn connect_btn"
            onClick={() => {
              payInvoice().then();
            }}
            disabled={busy}
          >
            Payer
          </button>
        </Col>
      </Row>
      <PaymentPendingModal visible={busy} />
    </div>
  );
};
export default observer(FinalizePayment);
