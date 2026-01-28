import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
//import { AiOutlineDollarCircle } from "react-icons/ai";
function CreatorDashboard() {
  const [types, settypes] = useState("Musique");
  //const [value, setValue] = useState("");
  //const [page, setPage] = useState(0);
  return (
    <div className="login-back">
      <div className="sidebarCont" style={{ minHeight: "100vh" }}>
        <Sidebar />
      </div>
      <div className="contentWrapper">
        <Header />
        <Container fluid className="pb-5">
          <Row className="mt-4 pl-3">
            <Col sm={8} className="align-self-center">
              <h3 className="bold_32_20 mb-0">Mes Licences</h3>
            </Col>
            <Col sm={4} className="align-self-center">
              <div className="text-right">
                <button type="button" className="btn connect_btn">
                  {" "}
                  Acheter une license{" "}
                </button>
              </div>
            </Col>
          </Row>
          {/* <Row className="mt-4 pl-3">
                <Col sm={3} className="align-self-center">
                <select name="cars" id="cars">
                  <option value="volvo">Tous les projets</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                </Col>
              </Row> */}
          <Tabs
            activeKey={types}
            id="uncontrolled-tab-example"
            className="mb-3 mt-4 ml-3 click_tab"
            onSelect={(e: any) => settypes(e)}
          >
            <Tab eventKey="Musique" title="Musique">
              {" "}
            </Tab>
            <Tab eventKey="Image" title="Image" className=""></Tab>
            <Tab eventKey="Video" title="Vidéo"></Tab>
          </Tabs>
          {/*getmyliscence.data == "" && getmypendlic == true && (
            <Row className="justify-content-center">
              <Col sm={5}>
                <div className="text-center mt-4">
                  <a href="" className="">
                    <img
                      className="img-fluid"
                      src="./assets/images/eye_img.png"
                    />
                  </a>
                  <p className="bold_16_20">Tes oeuvres apparaîtront ici.</p>
                  <p className="regular_12_68">
                    Crée ta première oeuvre en cliquant sur le bouton «Ajouter»
                  </p>
                </div>
              </Col>
            </Row>
          )}
          {getmypendlic == false && <ContentPlaceHolder />}
          {getmypendlic == true &&
            getmyliscence.data.map((mylic: any, index: any) => {
              return (
                <>
                  <div className="border_bottom_dc">
                    <Row className="pt-2 pb-2">
                      <Col
                        sm={1}
                        className="align-self-center text-center pr-xl-0"
                      >
                        <img
                          className="img-fluid dash_list_img"
                          src={`${mylic.cover}`}
                        />
                      </Col>
                      <Col sm={6} className="align-self-center pl-xl-0">
                        <p className="m-0 bold_16_20">
                          {mylic.title}{" "}
                          <span className="regular_12_20">{mylic.artist}</span>
                          <span className="m-0 regular_12_68">
                            par {mylic.artist_name}
                          </span>
                        </p>
                        <p className="m-0 regular_12_68">
                          <span>{mylic.title_of_project} </span>{" "}
                          {moment(mylic.created_at).format("MMMM Do YYYY")} .{" "}
                          {mylic.artist_name
                            ? mylic.artist_name
                            : mylic.first_name}

                        </p>
                      </Col>
                      <Col sm={5} className="align-self-center text-right">
                        <p className="mb-0">
                          <span className="pr-3 color_a5 twozero">
                            <AiOutlineDollarCircle></AiOutlineDollarCircle>
                          </span>
                          <a
                            className="btn Continuer_btn mr-2"
                            onClick={() =>
                              history.push(`/Licenseupdateedit/${mylic.id}`)
                            }
                          >
                            {" "}
                            Continuer{" "}
                          </a>
                          {mylic.status == "submited" && (
                            <a
                              className="btn licence_ri_btn"
                              style={{ cursor: "default" }}
                            >
                              {" "}
                              En attente de décision{" "}
                            </a>
                          )}
                          {mylic.status == "offer" && (
                            <a
                              className="btn licence_ri_btn"
                              style={{ cursor: "default" }}
                            >
                              {" "}
                              Contre-offre reçue
                            </a>
                          )}
                          {mylic.status == "accepted" && (
                            <a
                              className="btn activate_btn ml-2"
                              style={{ cursor: "default" }}
                            >
                              {" "}
                              En attente de signature{" "}
                            </a>
                          )}
                          {mylic.status == "signed" && (
                            <a
                              className="btn licence_ri_btn"
                              style={{ cursor: "default" }}
                            >
                              {" "}
                              Payer la licence
                            </a>
                          )}
                          {mylic.status == "active" && (
                            <a
                              className="btn activate_btn ml-2"
                              style={{ cursor: "default" }}
                            >
                              {" "}
                              Active{" "}
                            </a>
                          )}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </>
              );
            })*/}

          <Row sm={12}>
            <Col sm={6}>
              {/*getmyliscence.current_page != 1 && (
                <Button
                  onClick={() =>
                    myliscence(types, getmyliscence.current_page - 1)
                  }
                  className="text-center mt-3"
                >
                  Prev
                </Button>
              )*/}
            </Col>
            <Col sm={6} className="text-right">
              {/*getmyliscence.current_page != getmyliscence.last_page && (
                <Button
                  onClick={() =>
                    myliscence(types, getmyliscence.current_page + 1)
                  }
                  className="text-center mt-3"
                >
                  Next
                </Button>
              )*/}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default CreatorDashboard;
