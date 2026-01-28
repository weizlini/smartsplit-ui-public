import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo_smart.png";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import PageTemplate from "../components/PageTemplate";
const ForgotEmailSent = () => {
  return (
    <PageTemplate>
      <div className="mb-5 mb-sm-0 ">
        <Container fluid className="pb-5">
          <Row className="justify-content-center pb-3">
            <Col sm={7} className="align-self-center">
              <div>
                <Row className="justify-content-center pb-3">
                  <Col sm={6} className="justify-content-center mt-5">
                    <h3 className="justify-content-center medium_40_20 mt-4">
                      Connecte-toi à ton compte Smartsplit.
                    </h3>
                    <p className="regular_16_68 mt-3 mb-5">
                      Un courriel a été envoyé ou sera envoyé sous peu. Il
                      contient un lien de réinitialisation de ton mot de passe.
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn btn-lightbtn-lg btn-block mt-4 bgblock"
                      >
                        Retourner à la page d’accueil
                      </button>
                    </div>
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

export default observer(ForgotEmailSent);
