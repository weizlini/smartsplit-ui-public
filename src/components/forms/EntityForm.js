import {
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { BsEyeSlash } from "react-icons/bs";
import { AiFillQuestionCircle, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import EntityModel from "../../state/models/EntityModel";

const EntityForm = () => {
  const model = useState(new EntityModel());

  return (
    <div className="mb-5 mb-sm-0 ">
      <Container fluid className="pb-5">
        <Row className="justify-content-center pb-3">
          <Col xl={7} lg={10} className="align-self-center">
            <div>
              <Row className="justify-content-center pb-3">
                <Col
                  md={8}
                  xl={6}
                  className="justify-content-center mt-5 placeholder_text"
                >
                  <div className="form-group mt-5">
                    <label htmlFor="inputEmail" className="bold_16_20">
                      Mon courriel
                    </label>
                    <input
                      value={model.email.value}
                      name="email"
                      id="inputEmail"
                      type="text"
                      aria-describedby="emailHelp"
                      placeholder="tonnom@exemple.com"
                      className={`form-control log-input regular_16_8d`}
                      onChange={(event) => {
                        model.email.setValue(event.target.value);
                      }}
                    />
                    {model.email.error && model.validated ? (
                      <small className="form-text regular_12_ac">
                        {model.email.error}
                      </small>
                    ) : null}
                  </div>

                  <Row>
                    <Col sm={6} className="align-self-center">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          name="exampleCheck"
                          onChange={(event) => {
                            setChecked(!checked);
                          }}
                          className={
                            "form-check-input regular_16_8d check_box_st  "
                          }
                          checked={checked ? "checked" : ""}
                          id="exampleCheck"
                        />
                        <label
                          className="form-check-label regular_16_20"
                          htmlFor="exampleCheck"
                        >
                          Rester connecté{" "}
                        </label>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Se souvenir de mon mot de passe
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <AiFillQuestionCircle
                              className="regular_12_68 ml-2"
                              style={{ pointerEvents: "none" }}
                            ></AiFillQuestionCircle>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </Col>
                    <Col sm={6} className="align-self-center text-right">
                      <div className="form-check mt-4">
                        <button
                          type="submit"
                          className="btn connect_btn"
                          disabled={auth.busy}
                          onClick={() => {
                            submitForm();
                          }}
                        >
                          Me connecter
                          {auth.busy && <Spinner animation="grow" size="sm" />}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
