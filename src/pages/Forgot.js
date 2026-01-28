import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo_smart.png";
import { Col, Container, Row } from "react-bootstrap";
import { useStorePath } from "../state";
import AuthState from "../state/AuthState";
import { observer } from "mobx-react-lite";
import ForgotModel from "../state/models/ForgotModel";
import PageTemplate from "../components/PageTemplate";
const Forgot = () => {
  const auth: AuthState = useStorePath("auth");
  const [error, setError] = useState(false);
  const [model] = useState(new ForgotModel());
  const navigate = useNavigate();
  const submit = async () => {
    setError(false);
    const success = await auth.sendPassResetLink(model.email.value);
    if (success) {
      navigate("/reset-password-sent");
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    model.init();
  });
  return (
    <PageTemplate>
      <div className="mb-5 mb-sm-0 mt-5">
        <Container fluid className="pb-5">
          <Row className="justify-content-center pb-3">
            <Col sm={7} className="align-self-center">
              <div>
                <Row className="justify-content-center pb-3">
                  <Col sm={6} className="justify-content-center mt-5">
                    <h3 className="justify-content-center medium_40_20">
                      Réinitialise ton mot de passe.
                    </h3>
                    <p className="regular_16_68 mt-3">
                      Saisis l’adresse courriel liée à ton compte pour obtenir
                      le lien de réinitialisation.
                    </p>
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="bold_16_20"
                      >
                        Courriel
                      </label>
                      <input
                        name="email"
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder=""
                        className="form-control log-input regular_16_8d"
                        value={model.email.value}
                        onChange={(e) => model.email.setValue(e.target.value)}
                      />
                      {model.validated && model.email.error ? (
                        <small className="form-text regular_12_ac">
                          {model.email.error}
                        </small>
                      ) : null}
                      {error ? (
                        <small className="form-text regular_12_ac">
                          l'email n'existe pas dans le système
                        </small>
                      ) : null}
                    </div>
                    <Row className="mt-4">
                      <Col sm={6} className="align-self-center">
                        <div className="">
                          <Link to="/signup" className="bold_16_2d">
                            Je n’ai pas de compte
                          </Link>
                        </div>
                      </Col>
                      <Col sm={6} className="text-right">
                        <div>
                          <button
                            type="submit"
                            className="btn connect_btn"
                            onClick={submit}
                          >
                            Envoyer
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageTemplate>
  );
};

export default observer(Forgot);
