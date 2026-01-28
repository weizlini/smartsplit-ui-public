import { Col, Container, Figure, Row } from "react-bootstrap";
import parse from "html-react-parser";

const Diagram = () => {
  return (
    <div className="camp-figure">
      <div className="campaign-info-box bg_fa">
        <div className="camp-label">Droits disponibles</div>
        <div className="campaign-nums">25%</div>
        <div className="camp-label">
          sur l’oeuvre et sur l’enregistrement sonore
        </div>
      </div>
      <div className="campaign-info-box bg_fa">
        <div className="camp-label">Partage des revenus sur</div>
        <div className="campaign-nums">5 ans</div>
        <div className="camp-label">minimum</div>
      </div>
      <div className="camp-diagram">
        <img src="https://smartsplit.s3.us-east-2.amazonaws.com/smartsplit_2023/campaigns/socan-split.png" />
      </div>
    </div>
  );
};

const TestReactParse = () => {
  const htmlToParse = `
  <div class="campaign-section">
    <h2>Comment les revenus seront partagés?</h2>
    <h4>Reversement de revenus</h4>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar
        sodales urna sed hendrerit. Ut interdum quis arcu id viverra. Nulla
        aliquam nisl velit, quis malesuada nisl consectetur at. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Donec non sollicitudin
        eros. Integer et dictum ipsum, euismod sodales nibh. Nam diam diam,
        condimentum ac viverra ut, facilisis ac nisi.
    </p>
    <h4>Les sources de revenus</h4>
    <p>
        Nullam tincidunt ullamcorper tempor. Fusce laoreet ligula a ligula
        interdum, vitae eleifend nulla lobortis. Vivamus posuere erat justo, ut
        faucibus nulla tempor vitae. Vestibulum et tortor risus. Curabitur
        mauris eros, tempus ut semper non, facilisis vitae dui. Fusce vel nunc.
    </p>
    <h4>Un partage de revenus liés au droit d’auteur sur l’oeuvre </h4>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar
        sodales urna sed hendrerit. Ut interdum quis arcu id viverra. Nulla
        aliquam nisl velit, quis malesuada nisl consectetur at. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Donec non sollicitudin
        eros. Integer et dictum ipsum, euismod sodales nibh. Nam diam diam,
        condimentum ac viverra ut, facilisis ac nisi.
    </p>
    <figure/>
    <h4>
        Un partage de revenus liés au droit d’auteur sur l’enregistrement sonore
    </h4>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar
        sodales urna sed hendrerit. Ut interdum quis arcu id viverra. Nulla
        aliquam nisl velit, quis malesuada nisl consectetur at. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Donec non sollicitudin
        eros. Integer et dictum ipsum, euismod sodales nibh. Nam diam diam,
        condimentum ac viverra ut, facilisis ac nisi.
    </p>
    </div>
  `;
  const content = parse(htmlToParse, {
    replace: (domNode) => {
      if (domNode.name === "figure") {
        return <Diagram />;
      }
    },
  });
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={6}>{content}</Col>
      </Row>
    </Container>
  );
};
export default TestReactParse;
