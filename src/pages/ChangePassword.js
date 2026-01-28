import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/image/logo_smart.png";
import { isEmailUnique, resetPassword } from "../api/auth";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { observer } from "mobx-react-lite";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai/";
import { useStorePath } from "../state";
import UserModel from "../state/models/UserModel";
import UserState from "../state/UserState";
import { runInAction } from "mobx";
import ResetPasswordModel from "../state/models/ResetPasswordModel";
import PageTemplate from "../components/PageTemplate";

function ChangePassword() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [model] = useState(new ResetPasswordModel());
  const [emailUnique, setEmailUnique] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [formError, setFormError] = useState(false);
  useEffect(() => {
    if (!model.initialized) {
      model.init();
    }
  });
  const doResetPassword = async () => {
    let data = { ...model.toJS(), verification_code: code };
    const success = resetPassword(data);
    console.log(`success :${success}`);
    if (success) {
      navigate("/login");
    } else {
      setFormError(true);
    }
  };
  return (
    <PageTemplate>
      <div className="mb-5 mb-sm-0 ">
        <Container fluid className="pb-5">
          <Row className="justify-content-center pb-3">
            <Col xl={7} lg={10} className="align-self-center">
              <div>
                <Row className="justify-content-center pb-3">
                  <Col md={8} xl={6} className="justify-content-center mt-5">
                    <h3 className="justify-content-center medium_40_20">
                      Créer un Nouveau mot de passe.
                    </h3>
                    <p>
                      Créez un nouveau de mot de passe pour ton compte
                      SmartSplit.
                    </p>
                    <div className="form-group icons_relative">
                      <label htmlFor="inputPassword" className="bold_16_20">
                        Choisis ton mot de passe
                      </label>
                      <div className="ion_right">
                        {passwordShown === false && (
                          <BsEyeSlash
                            onClick={() => setPasswordShown(!passwordShown)}
                          ></BsEyeSlash>
                        )}
                        {passwordShown === true && (
                          <AiOutlineEye
                            onClick={() => setPasswordShown(!passwordShown)}
                          ></AiOutlineEye>
                        )}
                      </div>
                      {/* <div className="ion_right_left">
                                                  <TiArrowUpOutline></TiArrowUpOutline>
                                              </div> */}
                      <input
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        className={`form-control log-input regular_16_8d  ${
                          model.new_password.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                        id="exampleInputPassword1"
                        placeholder="8 caractères minimum"
                        value={model.new_password.value}
                        onChange={(e) =>
                          model.new_password.setValue(e.target.value)
                        }
                      />
                      <PasswordStrengthBar
                        password={model.new_password.value}
                      />
                      {model.new_password.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.new_password.error}{" "}
                        </small>
                      ) : null}
                    </div>

                    <div className="form-group icons_relative">
                      <div className="ion_right_eye">
                        <div className="ion_right_last">
                          {passwordShown === false && (
                            <BsEyeSlash
                              onClick={() => setPasswordShown(!passwordShown)}
                            ></BsEyeSlash>
                          )}
                          {passwordShown === true && (
                            <AiOutlineEye
                              onClick={() => setPasswordShown(!passwordShown)}
                            ></AiOutlineEye>
                          )}
                        </div>
                      </div>
                      <input
                        name="confirmPassword"
                        type={passwordShown ? "text" : "password"}
                        className={`form-control regular_16_8d" ${
                          model.confirm_password.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                        id="exampleInputPassword1"
                        placeholder="Confirme ton mot de passe"
                        value={model.confirm_password.value}
                        onChange={(e) => {
                          model.confirm_password.setValue(e.target.value);
                        }}
                      />
                      {model.confirm_password.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.confirm_password.error}{" "}
                        </small>
                      ) : null}
                    </div>
                    <Row>
                      {formError ? <Col sm={12}>Form submit failed</Col> : null}
                      <Col sm={3} className="align-self-center"></Col>
                      <Col sm={9} className="align-self-center text-right">
                        {formError ? (
                          <p className="error">Il Y a eu une erreur!</p>
                        ) : null}
                        <div className="form-check mt-4">
                          <button
                            type="submit"
                            disabled={model.busy || !emailUnique}
                            onClick={doResetPassword}
                            className="btn connect_btn"
                          >
                            Changer mon mot de passe
                            {model.busy && (
                              <Spinner animation="grow" size="sm" />
                            )}
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
    </PageTemplate>
  );
}
export default observer(ChangePassword);
