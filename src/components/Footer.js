import { observer } from "mobx-react-lite";
import { Col, Container, Row } from "react-bootstrap";
import { useStorePath } from "../state";
import Facebook from "./icons/Facebook";
import Instagram from "./icons/Instagram";
import Twitter from "./icons/Twitter";
import Youtube from "./icons/Youtube";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <Col md={3}>
          <h4>Suis Nous !</h4>
          <a href="https://facebook.com">
            <span className="icon">
              <Facebook />
            </span>
            <span>Facebook</span>
          </a>
          <a href="https://instagram.com">
            <span className="icon">
              <Instagram />
            </span>
            <span>Instagram</span>
          </a>
          <a href="https://twitter.com">
            <span className="icon">
              <Twitter />
            </span>
            <span>Twitter</span>
          </a>
          <a href="https://youtube.com">
            <span className="icon">
              <Youtube />
            </span>
            <span>Youtube</span>
          </a>
        </Col>
        <Col md={3}>
          <h4>Investir</h4>
          <Link to="/comment-ca-marche">Comment ça marche?</Link>
          <Link to="/campaigns">Parcourir les campagnes</Link>
          <Link to="/top-investors">Top investisseurs</Link>
          <Link to="/campaign-history">Historique des campagnes</Link>
          <Link to="/risques">Risques</Link>
          <Link to="/faq">FAQ</Link>
        </Col>
        <Col md={3}>
          <h4>Ouvrir son actif</h4>
          <Link to="/nouveau-modele">Nouveau modèle de financement</Link>
          <Link to="/comment-ca-marche">Comment ça marche?</Link>
          <Link to="/cas-inspirants">Les cas inspirants</Link>
          <Link to="/la-reglementation">La réglementation</Link>
          <Link to="/faq">FAQ</Link>
        </Col>
        <Col md={3}>
          <h4>L'Entreprise</h4>
          <Link to="/a-propos">À Propos</Link>
          <Link to="/equipe">L'Équipe</Link>
          <Link to="/histoire">Nôtre histoire</Link>
          <Link to="/privacy-policy">Politique de confidentialité</Link>
          <Link to="/terms-and-conditions">Termes et conditions</Link>
          <Link to="/contact">Contactez Nous</Link>
        </Col>
      </Row>
    </Container>
  );
};
export default observer(Footer);
