import React, { useEffect, useState } from "react";
import { toJS } from "mobx";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import LoginModel from "../state/models/LoginModel";
import { observer } from "mobx-react-lite";
import { BsEyeSlash } from "react-icons/bs";
import { AiFillQuestionCircle, AiOutlineEye } from "react-icons/ai/";
import { useStorePath } from "../state";
import logo from "../assets/image/logo_smart.png";
import AuthState from "../state/AuthState";
import UserState from "../state/UserState";
import { useSearchParams } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";
const LoginErrors = {
  unVerified: "Click on the activation link you have received by email",
  invalid: "Invalid Credentials",
};
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  //const [submitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const auth: AuthState = useStorePath("auth");
  const user: UserState = useStorePath("user");
  const [model] = useState(new LoginModel());
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  useEffect(() => {
    if (model && !model.initialized) {
      model.init();
      console.log(toJS(auth));
    }
  });

  //console.log(JSON.stringify(model.toJS()));
  //return <div>test</div>;
  const submitForm = async () => {
    //console.log(`validated? ${model.validated}`);
    await model.validate();
    //console.log(`validated? ${model.validated}`);
    if (model.isValid) {
      //console.log("form is valid");
      const error = await auth.login(model.email.value, model.password.value);
      if (error) {
        if (error === LoginErrors.invalid) {
          setLoginError(true);
        } else if (error === LoginErrors.unVerified) {
          navigate("/verify-email");
        }
      } else {
        if (user.first_name == null && user.last_name == null) {
          navigate(`/onboarding?redirect=${redirect}`);
        } else if (redirect) {
          navigate(window.atob(redirect));
        } else {
          navigate("/dashboard");
        }
      }
    } else {
      console.log("form is not valid");
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
                  <Col
                    md={8}
                    xl={6}
                    className="justify-content-center mt-5 placeholder_text"
                  >
                    <h3 className="justify-content-center medium_40_20">
                      Connecte-toi à ton compte Smartsplit.
                    </h3>
                    <p className="regular_16_68">
                      Entre tes informations ci-dessous.
                    </p>
                    {loginError ? (
                      <p>connexion échoué : verifiez le forumlaire</p>
                    ) : null}
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

                    <div className="form-group icons_relative mt-4">
                      <label htmlFor="inputPassword" className="bold_16_20">
                        Mon mot de passe
                      </label>

                      <div className="ion_right">
                        {passwordShown === false && (
                          <BsEyeSlash
                            onClick={() => {
                              setPasswordShown(!passwordShown);
                            }}
                          ></BsEyeSlash>
                        )}
                        {passwordShown === true && (
                          <AiOutlineEye
                            onClick={() => {
                              setPasswordShown(!passwordShown);
                            }}
                          ></AiOutlineEye>
                        )}
                      </div>
                      <input
                        name="password"
                        id="password"
                        type={passwordShown ? "text" : "password"}
                        className={"form-control log-input regular_16_8d"}
                        placeholder="8 caractères minimum"
                        onChange={(event) => {
                          model.password.setValue(event.target.value);
                        }}
                        value={model.password.value}
                      />
                      {model.password.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.password.error}
                        </small>
                      ) : null}
                    </div>
                    <p className="">
                      <Link to="/forgot" className="bold_16_2d">
                        Mot de passe oublié ?
                      </Link>
                    </p>

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
                            {auth.busy && (
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

export default observer(Login);
