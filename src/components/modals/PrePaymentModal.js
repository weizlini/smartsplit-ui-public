import { Col, Modal, Row } from "react-bootstrap";
import { toJS } from "mobx";
import React, { useEffect } from "react";
import "./PrePaymentModal.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import type AuthState from "../../state/AuthState";
import { useStorePath } from "../../state";
const PrePaymentModal = ({ visible, onCancel, url }) => {
  const auth: AuthState = useStorePath("auth");
  const user = useStorePath("user");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = window.btoa(location.pathname + "/invest");
  return (
    <Modal show={visible} onHide={onCancel} className="pre-pay-modal">
      <Modal.Header closeButton>
        <Modal.Title>Acheter des parts de revenus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <div className="pre-pay-modal">
              <h4>Crée toi un profil sur SmartSplit</h4>
              <p>
                Pour pouvoir investir dans des parts d'un project,{" "}
                <Link to={`/register/investor?redirect=${redirectUrl}`}>
                  crée-toi un profil
                </Link>{" "}
                sur Smartsplit ou{" "}
                <Link to={`/login?redirect=${redirectUrl}`}>connecte-toi</Link>,
                si tu en a déjà un.{" "}
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onCancel}>
          Annuler
        </button>
        <button
          className="btn connect_btn"
          onClick={() => {
            navigate(`/register/investor?redirect=${redirectUrl}`);
          }}
        >
          Créer mon compte
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default observer(PrePaymentModal);
