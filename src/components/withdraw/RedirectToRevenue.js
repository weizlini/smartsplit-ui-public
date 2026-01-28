import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { PageLoader } from "../Loader";
import { useNavigate } from "react-router-dom";

const RedirectToRevenue = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/revenue");
  });
  return (
    <Row>
      <Col sm={12}>
        <PageLoader />
      </Col>
    </Row>
  );
};
export default observer(RedirectToRevenue);
