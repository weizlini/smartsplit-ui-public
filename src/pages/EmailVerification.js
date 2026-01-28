import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo_smart.png";
import mastera from "../assets/image/sharemaster.png";
import Footer from "../components/Footer";
import PageTemplate from "../components/PageTemplate";
function EmailVerification() {
  return (
    <PageTemplate>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8} className="mt-5">
          <div className="text-center">
            <img className="sizeimgsucc" src={mastera} />
          </div>
          <div className="">
            <h5 className="card-title text-center margintop20">
              Vérifie tes courriels
            </h5>
            <p className="card-text text-center">
              Un message incluant un lien de validation de ton compte t'a été
              envoyé par courriel. Vérifie tes spams. On ne sait jamais !
            </p>
          </div>
          <div className="form-check mt-4 align-self-center text-center  ">
            <Link to="/Login">
              <button type="submit" className="btn connect_btn">
                J'ai compris
              </button>
            </Link>
          </div>
        </Col>
      </Row>
    </PageTemplate>
  );
}
export default EmailVerification;
