import { ButtonGroup, Col, Container, Dropdown, Row } from "react-bootstrap";
//import { FaRegSun, FaSistrix, FiLogOut } from "react-icons/all";
import { FaRegSun, FaSistrix } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { useStorePath } from "../state";
import UserState from "../state/UserState";
import logo from "../assets/images/smartsplit.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React from "react";
import AuthState from "../state/AuthState";
import defaultProfileImage from "../assets/images/demoface.jpg";

const PublicHeaderComponent = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { pathname } = useLocation();
  return (
    <Container fluid>
      <Row className="mt-4 justify-content-center">
        <Col md={3}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Col md={8}>
          <div className="become-member">
            {pathname === "/login" ? (
              <>
                <span>Pas encore membre?</span>
                <Link to="/register/investor" className="bold_16_2d">
                  Créer mon compte
                </Link>
              </>
            ) : null}
            {/register/.test(pathname) ? (
              <>
                <span>Déjà membre?</span>
                <Link
                  to={`/login${redirect ? `?redirect=${redirect}` : ""}`}
                  className="bold_16_2d"
                >
                  Ouvrir une session
                </Link>
              </>
            ) : null}
            {pathname !== "/login" && !/register/.test(pathname) ? (
              <>
                <Link to="/register/investor" className="bold_16_2d">
                  Créer mon compte
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link
                  to={`/login${redirect ? `?redirect=${redirect}` : ""}`}
                  className="bold_16_2d"
                >
                  Ouvrir une session
                </Link>
              </>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export const PublicHeader = observer(PublicHeaderComponent);
const LoggedInHeaderComponent = () => {
  const user: UserState = useStorePath("user");
  return (
    <>
      <div className="inner_height">
        <Container fluid className="bg_fa">
          <Row className="header pt-3 pb-3">
            <Col sm={4}>
              <Link to="/dashboard">
                <img
                  src={logo}
                  alt="logo"
                  style={{ display: "inline-block", marginLeft: "20px" }}
                />
              </Link>
            </Col>
            <Col sm={4} xs={8}>
              <div className="input-group icons_relative">
                <input
                  className="form-control borderless"
                  type="search"
                  placeholder="Rechercher..."
                />
                <div className="searchFas">
                  <FaSistrix className=""></FaSistrix>
                </div>
              </div>
            </Col>
            <Col sm={4} xs={4} className="text-right">
              <div className="header-right">
                <Dropdown as={ButtonGroup} className="group_arrow">
                  {user.profile_pic ? (
                    <img
                      className="header-avatar"
                      src={user.profile_pic}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  ) : (
                    <div className="name_letter">
                      {user.first_name
                        ? user.first_name.substring(0, 1).toUpperCase()
                        : "A"}
                      {user.last_name
                        ? user.last_name.substring(0, 1).toUpperCase()
                        : "A"}
                    </div>
                  )}
                  {/*<IoIosArrowDown  id="dropdown-split-basic"></IoIosArrowDown>*/}
                  <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" maxlength="1">
                      {" "}
                      <div className="flex-row">
                        <img
                          className="header-avatar"
                          src={
                            user.profile_pic
                              ? user.profile_pic
                              : defaultProfileImage
                          }
                          alt={`${user.first_name} ${user.last_name}`}
                        />
                        <span className="name_dropdown">
                          {user.first_name
                            ? user.first_name.substring(0, 1).toUpperCase()
                            : "A"}
                          {user.last_name
                            ? user.last_name.substring(0, 1).toUpperCase()
                            : "A"}
                        </span>{" "}
                        {user.first_name} {user.last_name}
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="/Settings">
                      {" "}
                      <FaRegSun className="mr-1"></FaRegSun> Paramètres
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">
                      {" "}
                      <FiLogOut className=""></FiLogOut> Me déconnecter
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export const LoggedInHeader = observer(LoggedInHeaderComponent);

const DashboardHeaderComponent = () => {
  const user: UserState = useStorePath("user");
  return (
    <>
      <div className="inner_height">
        <Container fluid className="bg_fa">
          <Row className="header pt-3 pb-3">
            <Col sm={1} xs={1}></Col>
            <Col sm={4} xs={4}>
              <div className="input-group icons_relative">
                <input
                  className="form-control borderless"
                  type="search"
                  placeholder="Rechercher..."
                />
                <div className="searchFas">
                  <FaSistrix className=""></FaSistrix>
                </div>
              </div>
            </Col>
            <Col sm={7} xs={8} className="text-right">
              <div className="header-right">
                <Dropdown as={ButtonGroup} className="group_arrow">
                  {user.profile_pic ? (
                    <img
                      className="header-avatar"
                      src={user.profile_pic}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  ) : (
                    <div className="name_letter">
                      {user.first_name
                        ? user.first_name.substring(0, 1).toUpperCase()
                        : "A"}
                      {user.last_name
                        ? user.last_name.substring(0, 1).toUpperCase()
                        : "A"}
                    </div>
                  )}
                  {/*<IoIosArrowDown  id="dropdown-split-basic"></IoIosArrowDown>*/}
                  <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" maxlength="1">
                      {" "}
                      <div className="flex-row">
                        <img
                          className="header-avatar"
                          src={
                            user.profile_pic
                              ? user.profile_pic
                              : defaultProfileImage
                          }
                          alt={`${user.first_name} ${user.last_name}`}
                        />
                        <span className="name_dropdown">
                          {user.first_name
                            ? user.first_name.substring(0, 1).toUpperCase()
                            : "A"}
                          {user.last_name
                            ? user.last_name.substring(0, 1).toUpperCase()
                            : "A"}
                        </span>{" "}
                        {user.first_name} {user.last_name}
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="/Settings">
                      {" "}
                      <FaRegSun className="mr-1"></FaRegSun> Paramètres
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">
                      {" "}
                      <FiLogOut className=""></FiLogOut> Me déconnecter
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export const DashboardHeader = observer(DashboardHeaderComponent);

export const CampaignHeader = () => {
  return (
    <Container fluid style={{ boxShadow: "inset 0px -1px 0px #DCDFE1" }}>
      <Row className="pt-4 pb-3">
        <Col md={3}>
          <img src={logo} alt="logo" style={{ marginLeft: "20px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export const Header = ({ dashboard }) => {
  const auth: AuthState = useStorePath("auth");
  return (
    <>
      {auth.token ? (
        dashboard ? (
          <DashboardHeader />
        ) : (
          <LoggedInHeader />
        )
      ) : (
        <PublicHeader />
      )}
    </>
  );
};
export default observer(Header);
