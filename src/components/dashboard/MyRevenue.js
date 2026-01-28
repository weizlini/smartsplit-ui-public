import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import InvestmentsView from "./InvestmentsView";
import EmptyState from "./EmptyState";
import { userPayouts } from "../../api/user";
import { PageLoader } from "../Loader";
import RevenueView from "./revenue/RevenueView";
import type RevenueState from "../../state/RevenueState";
import { useStorePath } from "../../state";

const MyRevenue = () => {
  const revenueState: RevenueState = useStorePath("revenue");
  const { loaded, totalPayout, payouts, pendingReceipt, pastReceipts } =
    revenueState;

  // the following effect will load revenue state everytime the page is reloaded/mounted

  useEffect(() => {
    revenueState.load();
    console.log(loaded);
  }, [loaded]);

  return (
    <>
      <Row className="mt-4 pl-3">
        <Col sm={12} className="align-self-center">
          <h2>Mes revenues</h2>
        </Col>
      </Row>
      {!loaded ? (
        <PageLoader vHeight={50} />
      ) : payouts.length || pendingReceipt ? (
        <>
          <Row>
            <Col sm={12}>
              <div className="tabs">
                <div className="tab active">Nouveaux gains</div>
                <div className="tab-spacer" />
                <div className="tab">Paramètres de paiements</div>
                <div className="tab-filler">&nbsp;</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <RevenueView
                payouts={payouts}
                totalPayout={totalPayout}
                pendingReceipt={pendingReceipt}
                pastReceipts={pastReceipts}
              />
            </Col>
          </Row>
        </>
      ) : (
        <EmptyState>
          <h5>Tes Revenus apparaîtrons ici.</h5>
          <p>
            Pour découvrir les campagnes auxquelles tu peux contribuer, cliques
            sur le bouton vert, en haut à droite.
          </p>
        </EmptyState>
      )}
    </>
  );
};
export default observer(MyRevenue);
