import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import React from "react";

const MyPublicProfile = () => {
  return (
    <Row className="mt-4 pl-3">
      <Col sm={12} className="align-self-center">
        <h3 className="bold_32_20 mb-0">Mon profile public</h3>
      </Col>
    </Row>
  );
};
export default observer(MyPublicProfile);
