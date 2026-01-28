import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import type InvestState from "../../state/InvestState";
import { useStorePath } from "../../state";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const PaymentError = () => {
  const investState: InvestState = useStorePath("invest");
  const { model, isInvesting } = investState;
  const navigate = useNavigate();
  const { url } = useParams();
  useEffect(() => {
    if (!isInvesting) {
      // navigate(`/campaign/${url}/invest`);
    }
  }, [isInvesting]);
  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">La transaction à échoué...</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={6}>
          <p>
            Nous sommes désolés, mais nous devons t'informer que la transaction
            n'a pas abouti comme prévu. Nous te suggérons de vérifier les
            informations saisies et de t'assurer que les fonds nécessaires sont
            disponibles. Si le problème persiste, n'hésite pas à contacter notre
            équipe d'assistance à <strong>support@allocentrique.com</strong> qui
            se fera un plaisir de t'aider à résoudre cette situation. Nous nous
            excusons pour tout inconvénient causé et espérons pouvoir t'assister
            avec succès dans une future transaction.
          </p>
        </Col>
      </Row>
    </div>
  );
};
export default observer(PaymentError);
