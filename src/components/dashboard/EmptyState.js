import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import React from "react";
import empty from "../../assets/images/Empty-State.png";
const EmptyState = (props) => {
  return (
    <div className="empty-state">
      <Row className="justify-content-center">
        <Col sm={6} md={8}>
          <div className="empty-state-text">
            <img src={empty} />
          </div>
          <div className="empty-state-text">{props.children}</div>
        </Col>
      </Row>
    </div>
  );
};
export default observer(EmptyState);
