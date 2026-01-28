import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utilities";
import { useStorePath } from "../../state";
import { useNavigate, useParams } from "react-router-dom";
import investState from "../../state/InvestState";
const InvestShares = () => {
  const model = useStorePath("invest", "model");
  const split = useStorePath("campaign", "split");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { url } = useParams();
  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">Selection de la quantité des parts</h2>
        </Col>
      </Row>
      <div className="invest-content">
        <Row className="justify-content-center">
          <Col sm={6}>
            <h4>Entre le nombre de parts que tu souhaites acheter :</h4>
            <div className="shares-layout">
              <input
                type={"text"}
                className="num-shares"
                value={model.shares.value}
                onKeyDown={(e) => {
                  if (e.key === "0" && model.shares.value === "")
                    e.preventDefault();
                  if (isNaN(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  model.shares.setValue(e.target.value);
                }}
              />
              {model.shares.value > 0 ? (
                <>
                  <div>&times;</div>
                  <div>{split.share_value}$</div>
                  <div>=</div>
                  <div className={"total"}>
                    {formatNumber(model.shares.value * split.share_value)}$
                  </div>
                </>
              ) : null}
            </div>
            {model.shares.error && model.validated ? (
              <div>
                <small className="form-text regular_12_ac">
                  {model.shares.error}
                </small>
              </div>
            ) : null}
          </Col>
        </Row>

        {model.shares.value > 0 ? (
          <>
            <Row className="justify-content-center">
              <Col sm={6}>
                <div className="form-check mt-4">
                  <input
                    type="checkbox"
                    id="accept_risk"
                    name="accept_risk"
                    onChange={(e) =>
                      model.accept_risk.setValue(e.target.checked)
                    }
                    className="form-check-input regular_16_8d check_box_st"
                    value={model.accept_risk.value}
                  />
                  <label className="form-check-label color_26 onefive">
                    Je comprends que je dois investir uniquement que ce que je
                    suis prêt à perdre complètement.
                  </label>
                </div>
                {model.accept_risk.error && model.validated ? (
                  <div>
                    <small className="form-text regular_12_ac">
                      {model.accept_terms.error}{" "}
                    </small>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={6}>
                <div className="form-check mt-4">
                  <input
                    type="checkbox"
                    id="accept_terms"
                    name="accept_terms"
                    onChange={(e) =>
                      model.accept_terms.setValue(e.target.checked)
                    }
                    className="form-check-input regular_16_8d check_box_st"
                    value={model.accept_terms.value}
                  />
                  <label
                    className="form-check-label color_26 onefive"
                    htmlFor="exampleCheck1 "
                  >
                    J’ai lu et j’accepte{" "}
                    <Link
                      to="/termsandcondition"
                      target="_blank"
                      className="color_2d"
                    >
                      <b className="gre">
                        les Termes et conditions d’utilisation
                      </b>{" "}
                    </Link>
                    et la{" "}
                    <Link
                      to="/privacypolicy"
                      target="_blank"
                      className="color_2d"
                    >
                      <b className="gre"> Politique sur la vie privée </b>
                    </Link>{" "}
                    de Smartsplit.
                  </label>
                </div>
                {model.accept_terms.error && model.validated ? (
                  <div>
                    <small className="form-text regular_12_ac">
                      {model.accept_terms.error}{" "}
                    </small>
                  </div>
                ) : null}
              </Col>
            </Row>
          </>
        ) : null}
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
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const isValid = await model.validate();
              setBusy(false);
              console.log(isValid);
              console.log(model.toJS());
              if (isValid) {
                navigate(`/campaign/${url}/invest/confirm`);
              } else {
                console.log("model not valid");
                return false;
              }
            }}
          >
            Continuer
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default observer(InvestShares);
