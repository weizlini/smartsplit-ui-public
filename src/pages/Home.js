import { Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import { observer } from "mobx-react-lite";
import { HomeHeader } from "../components/Header";
import React from "react";
import daniel from "../assets/images/daniel.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PageTemplate from "../components/PageTemplate";

const Home = () => {
  const navigate = useNavigate();
  return (
    <PageTemplate>
      <Container className="home-container">
        <Row className="justify-content-center">
          <Col
            xs={10}
            sm={10}
            md={8}
            lg={7}
            xl={6}
            xxl={6}
            style={{ paddingRight: "60px" }}
          >
            <h1 className="home-title">
              Bienvenue
              <br /> sur{" "}
              <strong>
                SMARTSPL<em>I</em>T
              </strong>
              &nbsp;!
            </h1>
            {/*<p>
              Te voilà à un clic de transformer tes fans en co-investisseurs sur
              ton prochain album ou projet musical.{" "}
            </p>
            <p>
              Tu te donneras ainsi les moyens financiers afin de faire connaître
              ta musique à sa juste valeur.
            </p>
            <p className="home-button">
              <button className="btn connect_btn">Commencer</button>
            </p>*/}
            <h2 className="home-example">Exemple de campagne:</h2>
            <h2>Daniel Boucher</h2>
            <h3>Financement de la mise en marché d’un album</h3>
            <img src={daniel} />
            <p className="home-button">
              <button
                className="btn connect_btn"
                onClick={() => {
                  navigate(
                    "/campaign/daniel-boucher-financer-mon-nouvel-album/"
                  );
                }}
              >
                Consulter
              </button>
            </p>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
export default observer(Home);
