import { Col, Row } from "react-bootstrap";
import React from "react";

const prettyDate = (dateString) => {
  const ts = Date.parse(dateString);
  const prettyDate = new Date(ts);
  return prettyDate.toLocaleDateString("fr");
};
const RevenueHistory = ({ receipts }) => {
  return (
    <div style={{ margin: "20px 20px 0 0" }}>
      <Row style={{ borderBottom: "1px solid #333" }}>
        <Col xs={3}>
          <strong>Date</strong>
        </Col>
        <Col xs={9} style={{ textAlign: "right" }}>
          <strong>Montant</strong>
        </Col>
      </Row>
      {receipts.map((r) => (
        <Row style={{ borderBottom: "1px solid #ccc" }}>
          <Col xs={3} style={{ marginTop: "10px" }}>
            {prettyDate(r.updated_at)}
          </Col>
          <Col xs={9} style={{ textAlign: "right" }}>
            <div>
              {Number(r.amount).toLocaleString("fr", {
                minimumFractionDigits: 2,
                useGrouping: "always",
              })}
              $
            </div>
            <div>
              <small style={{ color: "#2da84f" }}>Voir détails</small>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};
export default RevenueHistory;
