import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import { userInvestments } from "../../api/user";
import { PageLoader } from "../Loader";
import InvestmentsView from "./InvestmentsView";
const MyInvestments = () => {
  const [investments, setInvestments] = useState(null);
  useEffect(() => {
    const getInvestments = async () => {
      const response = await userInvestments();
      console.log(response);
      setInvestments(response.investments);
    };
    if (investments == null) {
      getInvestments().then();
    }
  }, [investments]);
  if (!investments) return <PageLoader />;

  return (
    <>
      <Row className="mt-4 pl-3">
        <Col sm={12} className="align-self-center">
          <h2>Mes investissements</h2>
        </Col>
      </Row>
      {investments.length ? (
        <Row className="investments-view">
          <Col sm={12}>
            <InvestmentsView investments={investments} />
          </Col>
        </Row>
      ) : (
        <EmptyState>
          <h5>Tes investissements apparaîtrons ici.</h5>
          <p>
            Pour découvrir les campagnes auxquelles tu peux contribuer, cliques
            sur le bouton vert, en haut à droite.
          </p>
        </EmptyState>
      )}
    </>
  );
};
export default observer(MyInvestments);
