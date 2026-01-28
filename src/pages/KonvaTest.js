import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import PageTemplate from "../components/PageTemplate";
import { Col, Container, Row } from "react-bootstrap";
import { Circle, Arc, Stage, Layer, Text, Image } from "react-konva";
import Copyright from "../components/icons/Copyright";
import Recording from "../components/icons/Recording";
import pieImg from "../assets/images/pie.png";
const CopyrightChart = ({ percentage, rightsType }) => {
  const angle = (percentage / 100) * 360;
  return (
    <div
      style={{
        width: "117px",
        height: "117px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Stage width={116} height={116}>
        <Layer>
          <Circle
            stroke={"#8DA0B2"}
            strokeWidth={58 / 2}
            x={58}
            y={58}
            width={116 - 58 / 2}
            height={116 - 58 / 2}
          ></Circle>
          <Arc
            angle={angle}
            innerRadius={58 / 2}
            outerRadius={58}
            fill={"#93E9E4"}
            x={58}
            y={58}
            rotation={-90}
          />
        </Layer>
      </Stage>
      <div
        style={{
          position: "absolute",
          top: `${rightsType === "recording" ? 40 : 38}px`,
          left: `${rightsType === "recording" ? 40 : 38}px`,
          zIndex: 1,
        }}
      >
        {rightsType === "recording" ? <Recording /> : <Copyright />}
      </div>
    </div>
  );
};
const KonvaTest = () => {
  return (
    <PageTemplate>
      <Container style={{ marginTop: "50px" }}>
        <Row className="justify-content-center">
          <Col sm={6}>
            <div>
              <CopyrightChart percentage={5} rightsType={"creator"} />
              <CopyrightChart percentage={5} rightsType={"recording"} />
            </div>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
export default observer(KonvaTest);
