import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/image/logo_smart.png";
import { isEmailUnique } from "../api/auth";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { observer } from "mobx-react-lite";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai/";
import { useStorePath } from "../state";
import UserModel from "../state/models/UserModel";
import UserState from "../state/UserState";
import { runInAction } from "mobx";
import PageTemplate from "../components/PageTemplate";

function Register({ mode }) {
  const navigate = useNavigate();
  //const auth: AuthState = useStorePath("auth");
  const userState: UserState = useStorePath("user");
  console.log(userState.redirect_url);
  const [model] = useState(new UserModel());
  const [emailUnique, setEmailUnique] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [formError, setFormError] = useState(false);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  useEffect(() => {
    if (!model.initialized) {
      model.init({ redirect_url: userState.redirect_url });
    }
  });
  const register = async () => {
    const isValid = await model.validate();

    if (isValid) {
      console.log(model.toJS());
      //return;
      runInAction(() => (model.busy = true));
      setFormError(false);
      const success = await userState.create(model.toJS(), mode);
      if (success) {
        //runInAction(()=>model.busy = false);
        navigate("/verify-email");
      } else {
        runInAction(() => (model.busy = false));
        setFormError(true);
      }
    } else {
      setFormError(true);
    }
  };
  const checkEmail = async (email) => {
    if (model.email.isValid) {
      const isUnique = await isEmailUnique(email);
      setEmailUnique(isUnique);
    } else {
      setEmailUnique(true);
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
                      {mode === "investor"
                        ? "Deviens un Investisseur"
                        : "En route vers la professionnalisation."}
                    </h3>
                    <p>
                      {mode === "investor"
                        ? "Tu es à un clic de pouvoir investir dans un projet."
                        : "Tu es à un clic de pouvoir documenter ta musique et de partager " +
                          "tes droits avec tes contributeurs."}
                    </p>
                    <div className="form-group mt-5">
                      <label htmlFor="inputEmail" className="bold_16_20">
                        Entre ton courriel
                      </label>
                      <input
                        onChange={(e) => {
                          model.email.setValue(e.target.value);
                          console.log(`email= ${model.email.value}`);
                          console.log(`email error = ${model.email.error}`);
                          console.log(`email isValid = ${model.email.isValid}`);
                          if (model.email.isValid) {
                            console.log("email is valid checking uniqueness");
                            checkEmail(model.email.value);
                          }
                        }}
                        id="email"
                        name="email"
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="tonnom@exemple.com"
                        value={model.email.value}
                        className={`form-control log-input regular_16_8d  ${
                          model.email.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                      />
                      {model.email.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.email.error}{" "}
                        </small>
                      ) : null}
                      {!emailUnique ? (
                        <small className="form-text regular_12_ac">
                          Ce courriel est déjà utilisé. As-tu oublié ton mot de
                          passe ?
                        </small>
                      ) : null}
                    </div>

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
                          model.password.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                        id="exampleInputPassword1"
                        placeholder="8 caractères minimum"
                        value={model.password.value}
                        onChange={(e) =>
                          model.password.setValue(e.target.value)
                        }
                      />
                      <PasswordStrengthBar password={model.password.value} />
                      {model.password.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.password.error}{" "}
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
                          model.confirmPassword.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                        id="exampleInputPassword1"
                        placeholder="Confirme ton mot de passe"
                        value={model.confirmPassword.value}
                        onChange={(e) =>
                          model.confirmPassword.setValue(e.target.value)
                        }
                      />
                      {model.confirmPassword.error && model.validated ? (
                        <small className="form-text regular_12_ac">
                          {model.confirmPassword.error}{" "}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-check icons_relative mt-4">
                      <div
                        className={` ${
                          model.accept_terms.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="accept_terms"
                          name="accept_terms"
                          onChange={(e) =>
                            model.accept_terms.setValue(e.target.checked)
                          }
                          className="form-check-input regular_16_8d check_box_st"
                          value={model.accept_terms.value}
                        />
                        <label
                          className="form-check-label color_26 onefive"
                          htmlFor="exampleCheck1 "
                        >
                          J’ai lu et j’accepte{" "}
                          <Link
                            to="/termsandcondition"
                            target="_blank"
                            className="color_2d"
                          >
                            <b className="gre">
                              les Termes et conditions d’utilisation
                            </b>{" "}
                          </Link>
                          et la{" "}
                          <Link
                            to="/privacypolicy"
                            target="_blank"
                            className="color_2d"
                          >
                            <b className="gre"> Politique sur la vie privée </b>
                          </Link>{" "}
                          de Smartsplit.
                        </label>
                      </div>
                      {model.accept_terms.error &&
                      model.validated &&
                      emailUnique ? (
                        <small className="form-text regular_12_ac">
                          {model.accept_terms.error}{" "}
                        </small>
                      ) : null}
                    </div>
                    <Row>
                      {formError ? <Col sm={12}>Form submit failed</Col> : null}
                      <Col sm={5} className="align-self-center">
                        <div className="form-check mt-4">
                          <input
                            type="checkbox"
                            id="stay_connected"
                            name="stay_connected"
                            className="form-check-input regular_16_8d check_box_st"
                            onChange={(e) =>
                              model.stay_connected.setValue(e.target.checked)
                            }
                            value={model.stay_connected.value}
                          />
                          <label
                            className="form-check-label regular_16_20"
                            htmlFor="exampleCheck2"
                          >
                            Rester connecté
                          </label>
                          {model.stay_connected.error &&
                          model.validated &&
                          emailUnique ? (
                            <small className="form-text regular_12_ac">
                              {model.stay_connected.error}{" "}
                            </small>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={7} className="align-self-center text-right">
                        <div className="form-check mt-4">
                          <button
                            type="submit"
                            disabled={model.busy || !emailUnique}
                            onClick={register}
                            className="btn connect_btn"
                          >
                            Créer mon compte{" "}
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
export default observer(Register);
