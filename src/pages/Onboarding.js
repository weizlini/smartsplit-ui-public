import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import UserModel from "../state/models/UserModel";
import { useStorePath } from "../state";
import logo from "../assets/images/logo_smart.png";
import defaultProfileImage from "../assets/images/demoface.jpg";
import ImageUploadModal from "../components/modals/ImageUploadModal";
import UserState from "../state/UserState";
import OnboardingModel from "../state/models/OnboardingModel";
import { Loader } from "../components/Loader";
import PageTemplate from "../components/PageTemplate";
const Onboarding = () => {
  const [model] = useState(new OnboardingModel());
  const user: UserState = useStorePath("user");
  const [visible, setVisible] = useState();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState(user.profile_pic);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const submit = async () => {
    await model.validate();
    if (model.isValid) {
      try {
        await user.update(model.toJS());
        navigate(user.redirect_url);
      } catch (e) {
        setError(true);
      }
    }
  };
  useEffect(() => {
    if (!model.initialized)
      model.init({
        first_name: user.first_name,
        last_name: user.last_name,
        artist_name: user.artist_name,
      });
  });
  useEffect(() => {
    if (img) {
      user.update({ profile_pic: img });
    }
  }, [img]);
  return (
    <PageTemplate>
      <div className="mb-5 mb-sm-0">
        <Container fluid className="pb-5">
          <Row className="justify-content-center pb-3">
            <Col xl={7} lg={10} className="align-self-center">
              <div className="pt-4 ">
                <Row className="justify-content-center pb-3">
                  <Col md={8} xl={7} className="justify-content-center mt-4">
                    <h3 className="justify-content-center mb-0 medium_40_20">
                      Bienvenue !
                    </h3>
                    <h3 className="medium_40_20">Parle-nous un peu de toi.</h3>
                    <p className="regular_16_68">
                      Commence à créer ton profil.
                    </p>
                    <img
                      className="profile-avatar mt-5 mb-4"
                      src={img ? img : defaultProfileImage}
                      alt="profile"
                    ></img>
                    <FaPen
                      className="ml-4 edit_pencil mt-4"
                      onClick={() => {
                        setVisible(true);
                      }}
                    ></FaPen>
                    <Row>
                      <Col sm={6}>
                        <div className="form-group">
                          <label htmlFor="first_name" className="bold_16_20">
                            Mon prénom
                          </label>
                          <input
                            name="first_name"
                            type="text"
                            className={`form-control regular_16_8d  ${
                              model.first_name.error && model.validated
                                ? "errorInput"
                                : ""
                            }`}
                            id="first_name"
                            aria-describedby="emailHelp"
                            placeholder="Prénom(s) usuel(s)"
                            value={model.first_name.value}
                            onChange={(e) => {
                              model.first_name.setValue(e.target.value);
                            }}
                          />
                          <small
                            id="emailHelp"
                            className="form-text regular_12_68"
                          >
                            Exemple :{" "}
                            <span className="style_italic">Madonna Louise</span>
                          </small>
                          {model.first_name.error && model.validated ? (
                            <div className="form-text regular_12_ac">
                              {model.first_name.error}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="form-group">
                          <label htmlFor="last_name" className="bold_16_20">
                            Mon nom
                          </label>
                          <input
                            name="last_name"
                            type="text"
                            className={`form-control regular_16_8d  ${
                              model.last_name.error && model.validated
                                ? "errorInput"
                                : ""
                            }`}
                            id="exampleInputPassword1"
                            placeholder="Nom de famille usuel"
                            value={model.last_name.value}
                            onChange={(e) => {
                              model.last_name.setValue(e.target.value);
                            }}
                          />
                          <small
                            id="emailHelp"
                            className="form-text regular_12_68"
                          >
                            Exemple :{" "}
                            <span className="style_italic">Ciccone</span>{" "}
                          </small>
                          {model.last_name.error && model.validated ? (
                            <div className="form-text regular_12_ac">
                              {model.last_name.error}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group mt-2">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="bold_16_20"
                        style={{ display: "inline-block", marginRight: "10px" }}
                      >
                        Mon nom d’artiste
                      </label>
                      <label
                        htmlFor="exampleInputPassword1"
                        className="medium_16_68 float-right"
                      >
                        Optionnel
                      </label>
                      <input
                        name="artist_name"
                        type="text"
                        className={`form-control regular_16_8d  ${
                          model.artist_name.error && model.validated
                            ? "errorInput"
                            : ""
                        }`}
                        id="artist_name"
                        value={model.artist_name.value}
                        onChange={(e) => {
                          model.artist_name.setValue(e.target.value);
                        }}
                      />
                      <small id="emailHelp" className="form-text regular_12_68">
                        Par exemple,{" "}
                        <span className="style_italic">
                          Madonna est le nom d’artiste de Madonna Louise Ciccone
                        </span>
                      </small>
                      {model.artist_name.error && model.validated ? (
                        <div className="form-text regular_12_ac">
                          {model.artist_name.error}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-check mt-4 text-right mt-5">
                      <button
                        type="submit"
                        className="btn connect_btn"
                        disabled={busy}
                        onClick={() => {
                          submit().then();
                        }}
                      >
                        {busy ? <Loader /> : "C’est parti !"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ImageUploadModal
        visible={visible}
        onSaved={(media) => {
          console.log(media);
          setImg(media.url);
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        circle={true}
      />
    </PageTemplate>
  );
};
export default observer(Onboarding);
