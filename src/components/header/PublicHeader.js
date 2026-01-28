import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/smartsplit.png";
import { Link } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";

const PublicHeader = () => {
  return (
    <Container fluid>
      <Row className="mt-4 justify-content-center">
        <Col md={3}>
          <img src={logo} alt="logo" />
        </Col>
        <Col md={8}>
          <ul className="pl-0 mt-3 mt-md-0 log_header text-left text-md-right regular_16_68">
            <li>Pas encore membre?</li>
            <li className="">
              <Link to="/register" className="bold_16_2d">
                Créer mon compte
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default observer(PublicHeader);
