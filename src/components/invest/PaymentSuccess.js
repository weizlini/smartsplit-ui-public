import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import type InvestState from "../../state/InvestState";
import { useStorePath } from "../../state";
import type CampaignState from "../../state/CampaignState";
import type { Campaign, Project, PublicSplit } from "../../api/campaign";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const investState: InvestState = useStorePath("invest");
  const { model, isInvesting } = investState;
  console.log(investState);
  const campaignState: CampaignState = useStorePath("campaign");
  const split: PublicSplit = campaignState.split;
  const campaign: Campaign = campaignState.campaign;
  const project: Project = campaignState.project;
  const navigate = useNavigate();
  const { url } = useParams();
  useEffect(() => {
    if (!isInvesting) {
      navigate(`/campaign/${url}/invest`);
    }
  }, [isInvesting]);
  const calculateRevenue = () => {
    return ((split.percentage * model.shares.value) / split.shares).toFixed(3);
  };
  const endDate = new Date(split.date_ends);
  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">La transaction à été approuvée!</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={6}>
          <p>
            Félicitations ! Tu possèdes maintenant une partie des revenus
            d'exploitation à venir de <strong>{project.title}</strong> et ce,
            jusqu'au{" "}
            {endDate.toLocaleDateString("fr-CA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            Merci d'avoir investi dans cette campagne de financement
            participatif !
          </p>
          <p>
            {" "}
            Un reçu de cette transaction t’a été envoyé par courriel. Assure-toi
            de bien vérifier ta boîte de réception (et tes spams aussi). Ce reçu
            sera également accessible via ton tableau de bord sur SMARTSPLIT.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={6} className="button-row">
          <button
            className="btn connect_btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Naviguer vers mon tableau-de-bord
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default observer(PaymentSuccess);
