import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import FlowBox from "./FlowBox";
import type RevenueState from "../../state/RevenueState";
import { useStorePath } from "../../state";
import type UserState from "../../state/UserState";
import { FaEye, FaPen } from "react-icons/fa";
import { getAddEftProfileToken } from "../../api/zum";
import { useNavigate } from "react-router-dom";
import WithdrawModel from "../../state/models/WithdrawModel";
import InteracInfoModal from "../modals/InteracInfoModal";
import { Loader } from "../Loader";
const MethodDetails = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const userState: UserState = useStorePath("user");
  const [token, setToken] = useState();
  const [answerVisible, setAnswerVisible] = useState();
  const [error, setError] = useState();
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const methods = {
    Eft: "Transfer direct (EFT)",
    Interac: `Interac`,
    VisaDirectPush: "Visa Direct",
  };
  const {
    loaded,
    totalPayout,
    withdrawalFlowActive,
    interacQAFlowActive,
    availableMethods,
    interacModel,
    cardInfo,
    interacAnswer,
    interacQuestion,
  } = revenueState;
  const withdrawModel: WithdrawModel = revenueState.withdrawModel;
  console.log(withdrawModel.method.value);
  const saveZumEftUserId = async (zumUserId) => {
    console.log();
    const data = {
      zum_eft_user_id: zumUserId,
    };
    const success = await userState.update(data);
    await revenueState.loadEftInfo();
    setBusy(false);
  };
  const initCreateEftProfile = () => {
    setBusy(true);
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
        saveZumEftUserId(data.userId).then();
      },
      onButtonClose: function () {
        console.log("onButtonClose");
      },
    });
  };
  useEffect(() => {
    if (!withdrawalFlowActive) navigate("/dashboard/revenue");
    const getToken = async () => {
      const connectToken = await getAddEftProfileToken();
      if (connectToken === false) {
        setError(true);
      } else {
        setToken(connectToken);
      }
    };
    if (!token) {
      getToken().then();
    }
  }, [token]);
  return (
    <>
      <FlowBox
        prev={"Change la méthode de transfert"}
        prevUrl="/dashboard/revenue/withdraw/select-method"
        next={"confirmer"}
        nextUrl="/dashboard/revenue/withdraw/process"
        nextDisabled={() => {
          switch (withdrawModel.method.value) {
            case "Eft":
              return !revenueState.eftAvailable;
            case "Interac":
              return !revenueState.interacReady;
            case "VisaDirectPush":
              return !revenueState.isMethodAvailable("VisaDirectPush");
          }
        }}
        nextClick={() => true}
        prevDisabled={() => false}
        prevClick={() => true}
      >
        <div className="method-secondary-content">
          <Row className="justify-content-center">
            <Col sm={12}>
              <h3>{methods[withdrawModel.method.value]}</h3>
            </Col>
          </Row>
          {busy ? (
            <>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loader size={50} />
                  </div>
                </Col>
              </Row>
            </>
          ) : null}
          {!busy && withdrawModel.method.value === "VisaDirectPush" ? (
            <Row className="justify-content-center">
              <Col sm={12}>
                <h4>Details de depot Visa Direct</h4>
                <p>Virement à la carte Visa {cardInfo.NumberMasked}</p>
              </Col>
            </Row>
          ) : null}
          {!busy &&
          withdrawModel.method.value === "Eft" &&
          !revenueState.eftAvailable ? (
            <>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <h4>Details de virement compte bancaire</h4>
                  <p>
                    Pour recevoir le montant directement dans vôtre compte de
                    banque, vous devez fournier les détails de ce compte. Nous
                    travaillons avec le partenaire transactionnel «Zūm Rails»
                    afin de sécuriser votre compte
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <button
                    className="btn connect_btn"
                    onClick={initCreateEftProfile}
                  >
                    Ajouter mes infos bancaires
                  </button>
                </Col>
              </Row>
            </>
          ) : null}
          {!busy &&
          withdrawModel.method.value === "Eft" &&
          revenueState.eftAvailable ? (
            <>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <h4>Details de virement de compte bancaire</h4>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <p>Institution: {revenueState.bankInfo.Institution}</p>
                  <p>Vers le compte : {revenueState.bankAccountNumberMasked}</p>
                </Col>
              </Row>
            </>
          ) : null}
          {withdrawModel.method.value === "Interac" &&
          !revenueState.interacReady ? (
            <div>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <h4>Details Interac</h4>
                  <h4>
                    Montant{" "}
                    {totalPayout.toLocaleString("fr-CA", {
                      minimumFractionDigits: 2,
                    })}
                    $
                  </h4>
                  <p>vers le courriel {userState.email}</p>
                  <p>
                    Tu dois créer une question/réponse Interac pour recevoir tes
                    fonds
                  </p>
                  <button
                    className={"btn connect_btn"}
                    onClick={() => {
                      revenueState.startInteracQA();
                    }}
                  >
                    Créer mes infos Interac
                  </button>
                </Col>
              </Row>
            </div>
          ) : null}
          {withdrawModel.method.value === "Interac" &&
          revenueState.interacReady &&
          !revenueState.interacQAFlowActive ? (
            <>
              <Row className="justify-content-center">
                <Col xs={12}>
                  <h4>Details Interac</h4>
                  <h4>
                    Montant{" "}
                    {totalPayout.toLocaleString("fr-CA", {
                      minimumFractionDigits: 2,
                    })}
                    $
                  </h4>
                  <p>vers le courriel {userState.email}</p>
                  <div className="flex-row">
                    <h4>Question et Réponse Interac</h4>
                    <p>
                      <FaPen
                        className="icon_sm"
                        onClick={() => {
                          revenueState.startInteracQA();
                        }}
                      ></FaPen>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12}>
                  <p>
                    <strong>Question:</strong> {interacQuestion}
                  </p>
                  <p>
                    <strong>Réponse:</strong>{" "}
                    {answerVisible ? (
                      interacAnswer
                    ) : (
                      <span>
                        {"************************".substring(
                          0,
                          interacAnswer.length - 1
                        )}
                      </span>
                    )}
                    <FaEye
                      className="icon_sm"
                      onClick={() => {
                        setAnswerVisible(!answerVisible);
                      }}
                    ></FaEye>
                  </p>
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      </FlowBox>
      <InteracInfoModal
        visible={interacQAFlowActive}
        onCancel={() => {
          revenueState.cancelInteracQA();
        }}
        onSave={() => {}}
      />
    </>
  );
};
export default observer(MethodDetails);
