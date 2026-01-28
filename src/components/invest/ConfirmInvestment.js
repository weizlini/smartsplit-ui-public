import { Col, Row } from "react-bootstrap";
import { formatNumber } from "../../utilities";
import { observer } from "mobx-react-lite";
import { useStorePath } from "../../state";
import React, { useEffect } from "react";
import type InvestState from "../../state/InvestState";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmInvestment = () => {
  const model = useStorePath("invest", "model");
  const { split, artist } = useStorePath("campaign");
  const investState: InvestState = useStorePath("invest");
  const { isInvesting } = investState;
  const navigate = useNavigate();
  const { url } = useParams();
  const calculateRevenue = () => {
    return (
      (split.percentage * model.shares.value) /
      split.shares
    ).toLocaleString("fr-ca");
  };
  useEffect(() => {
    if (!isInvesting) {
      navigate(`/campaign/${url}/invest`);
    }
  }, [isInvesting]);
  const endDate = new Date(split.date_ends);

  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">Confirme ton investissement</h2>
        </Col>
      </Row>
      <div className="invest-content">
        <Row className="justify-content-center">
          <Col sm={6}>
            <p>
              Tu choisis d’acheter{" "}
              <strong>
                {model.shares.value > 1 ? model.shares.value : "une"} part
                {model.shares.value > 1 ? "s" : ""}
              </strong>{" "}
              à{" "}
              <strong>
                {split.share_value.toLocaleString("fr-CA")}&nbsp;$
              </strong>{" "}
              {model.shares.value > 1 ? "chacune" : ""}, pour un montant total
              de{" "}
              <strong>
                {(model.shares.value * split.share_value).toLocaleString(
                  "fr-CA"
                )}
                &nbsp;$
              </strong>
              . {model.shares.value > 1 ? "Ces " + model.shares.value : "Cette"}{" "}
              part{model.shares.value > 1 ? "s" : ""} te donneront accès à{" "}
              <strong>{calculateRevenue()}%</strong> des revenus d’exploitation
              des droits du prochain album de <em>{artist.name}</em>, jusqu'au{" "}
              {endDate.toLocaleDateString("fr-CA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
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
              navigate(`/campaign/${url}/invest/payment`);
            }}
          >
            Confirmer
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default observer(ConfirmInvestment);
