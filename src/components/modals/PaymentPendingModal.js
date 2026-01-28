import { Col, Modal, Row } from "react-bootstrap";
import { toJS } from "mobx";
import React, { useEffect } from "react";
import "./PrePaymentModal.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import type AuthState from "../../state/AuthState";
import { useStorePath } from "../../state";
import { Loader } from "../Loader";
import "./PaymentPendingModal.css";
const PaymentPendingModal = ({ visible }) => {
  return (
    <Modal show={visible} onHide={() => {}} className="pay-pending-modal">
      <Modal.Body>
        <Row>
          <Col xs={12}>
            <div className="pending-content">
              <h4>Nous traitons votre paiement, veuillez patienter</h4>
              <p>
                La transaction peut prendre un peut de temps. Svp ne fermez pas
                cette page avant que la transaction soit complété
              </p>
              <div className="waiting-payment">
                <Loader size={50} />
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default observer(PaymentPendingModal);
