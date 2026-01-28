import { Col, Row } from "react-bootstrap";
import type { PaymentModalProps } from "../modals/PaymentModal/PaymentModal";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { getAddPaymentProfileToken } from "../../api/zum";
import { useNavigate, useParams } from "react-router-dom";
import { useStorePath } from "../../state";
import UserModel from "../../state/models/UserModel";
import type UserState from "../../state/UserState";
import { PageLoader } from "../Loader";
const AddZumPayoutMethod = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [paymentProfileCreated, setPaymentProfileCreated] = useState(false);
  const [SDKResponse, setSDKResponse] = useState(null);
  const navigate = useNavigate();
  const { url } = useParams();
  const investState = useStorePath("invest");
  const userState: UserState = useStorePath("user");
  const { isInvesting } = investState;
  useEffect(() => {
    if (!isInvesting) {
      navigate(`/campaign/${url}/invest`);
    }
  }, [isInvesting]);
  useEffect(() => {
    if (userState.zum_user_id) {
      navigate(`/campaign/${url}/invest/finalize`);
    }
  });
  useEffect(() => {
    const getToken = async () => {
      const connectToken = await getAddPayoutProfileToken();
      if (connectToken === false) {
        setError(true);
      } else {
        setToken(connectToken);
        setLoading(false);
      }
    };
    if (loading === true) {
      getToken().then();
    }
  }, []);
  const saveZumUserId = async (zumUserId) => {
    console.log();
    const data = {
      zum_user_id: zumUserId,
    };
    const success = await userState.update(data);
    if (success) {
      setPaymentProfileCreated(true);
    }
  };
  const initCreatePaymentProfile = () => {
    window.ZumRailsSDK.init({
      token: token,
      onLoad: function () {
        console.log("onLoad");
      },
      onError: function (error) {
        console.log("onError", error);
      },
      onSuccess: (data) => {
        console.log(data);
        saveZumUserId(data.userId).then();
      },
      onButtonClose: function () {
        console.log("onButtonClose");
      },
    });
  };
  if (loading) return <PageLoader />;
  return (
    <div>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h2 className="titre-etape">Crée un profile de paiement</h2>
        </Col>
      </Row>
      <div className="invest-content">
        <Row className="justify-content-center">
          <Col sm={6}>
            <p>
              Afin de pouvoir vous verser votre juste part des éventuels revenus
              de Daniel Boucher, nous vous invitons à créer votre profil de
              paiement à l’aide de votre carte de débit VISA ou votre carte de
              crédit.
            </p>
            <p>
              Notez que nous travaillons avec le partenaire transactionnel «Zūm
              Rails» afin de sécuriser vos sommes et transactions.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={"auto"}>
            <button
              className="btn connect_btn"
              onClick={initCreatePaymentProfile}
            >
              Créer mon profile de paiement
            </button>
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
        </Col>
      </Row>
    </div>
  );
};
export default observer(AddZumPayoutMethod);
