import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStorePath } from "../../state";
import InteracQAModel from "../../state/models/InteracQAModel";
import RevenueState from "../../state/RevenueState";

const InteracInfoModal = ({ visible, onCancel, onSave }) => {
  const revenueState: RevenueState = useStorePath("revenue");
  const model: InteracQAModel = revenueState.interacModel;
  const saveInteracInfo = async () => {
    const isValid = await model.validate();
    if (isValid) {
      console.log("is valid");
      const response = await revenueState.saveInteracInfo(model.toJS());
    } else {
      console.log("not");
    }
  };

  return (
    <Modal show={visible} onHide={onCancel} className="interac-info-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {revenueState.interacReady ? "Modifier" : "Créer"} mes infos Interac
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div className="field-group">
              <label>Question Interac</label>
              <input
                type={"text"}
                value={model.interac_question.value}
                onChange={(e) => {
                  model.interac_question.setValue(e.target.value);
                }}
              />
              {model.interac_question.error && model.validated ? (
                <div className={"field-error"}>
                  chiffres, lettres et "?.-,#" de 5 à 40 caractères
                </div>
              ) : null}
            </div>
            <div className="field-group">
              <label>Réponse Interac</label>
              <input
                type={"text"}
                value={model.interac_answer.value}
                onChange={(e) => {
                  model.interac_answer.setValue(e.target.value);
                }}
              />
              {model.interac_answer.error && model.validated ? (
                <div className={"field-error"}>
                  chiffres, lettres de 3 à 25 caractères
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn"
          onClick={() => {
            revenueState.cancelInteracQA();
            onCancel();
          }}
        >
          Annuler
        </button>
        <button
          className="btn connect_btn"
          onClick={() => {
            saveInteracInfo().then();
          }}
        >
          Sauvegarder
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default observer(InteracInfoModal);
