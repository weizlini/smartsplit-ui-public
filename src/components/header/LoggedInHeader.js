import UserState from "../../state/UserState";
import { useStorePath } from "../../state";
import { ButtonGroup, Col, Container, Dropdown, Row } from "react-bootstrap";
import { FaRegSun, FaSistrix } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { observer } from "mobx-react-lite";

const LoggedInHeader = () => {
  const user: UserState = useStorePath("user");
  console.log(user.profile_pic);
  return (
    <>
      <div className="inner_height">
        <Container fluid className="bg_fa">
          <Row className="header pt-3 pb-3">
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
            <Col sm={8} xs={4} className="text-right">
              <div>
                <Dropdown as={ButtonGroup} className="group_arrow">
                  {user.profile_pic ? (
                    <img
                      className="header-avatar"
                      src={user.profile_pic}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  ) : (
                    <div className="name_letter">
                      {user.first_name ? user.first_name.substring(0, 1) : "A"}
                      {user.last_name ? user.last_name.substring(0, 1) : "A"}
                    </div>
                  )}{" "}
                  {/*<IoIosArrowDown  id="dropdown-split-basic"></IoIosArrowDown>*/}
                  <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" maxlength="1">
                      {" "}
                      <span className="name_dropdown">
                        {user.first_name
                          ? user.first_name.substring(0, 1)
                          : "A"}
                        {user.last_name ? user.last_name.substring(0, 1) : "A"}
                      </span>{" "}
                      {user.first_name} {user.last_name}
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
export default observer(LoggedInHeader);
