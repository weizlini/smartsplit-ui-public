import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import PageTemplate from "../components/PageTemplate";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import defaultImage from "../assets/images/dummy_200x200_ffffff_cccccc.png";
import defaultImage100 from "../assets/images/dummy_100x100_ffffff_cccccc.png";
import defaultImage40 from "../assets/images/dummy_40x40_ffffff_cccccc.png";
import { FaPen } from "react-icons/fa";
import ImageUploadModal from "../components/modals/ImageUploadModal";
import "./CreateCampaign.css";
const CreateCampaign = () => {
  const [visible, setVisible] = useState();
  const [img, setImg] = useState();
  return (
    <PageTemplate>
      <Container className="create-campaign">
        <Row className="justify-content-center">
          <Col sm={6}>
            <h2>Créer une Nouvelle Campagne</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6}>
            <h4>l'Artiste</h4>
            <Dropdown></Dropdown>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6}>
            <h4>Image de la campagne</h4>
            <p>
              L'image apparaitra dans les pages de campages, les resultats de
              recherche, et dans les tableau de bords des investisseurs
            </p>
            <div className="campaign-covers">
              <div className="cover-editor">
                <img
                  className="campaign-cover"
                  src={img ? img : defaultImage}
                  alt="profile"
                ></img>
                <FaPen
                  size={18}
                  className="ml-4 edit_pencil mt-4"
                  onClick={() => {
                    setVisible(true);
                  }}
                ></FaPen>
              </div>
              <div className="smaller-images">
                <small>Les autres tailles d'images</small>
                <img className="image100" src={img ? img : defaultImage100} />
                <img className="image40" src={img ? img : defaultImage40} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6}>
            <h4>La Video de la campagne</h4>
            <p>Ajouter une vidéo de Youtube, en copiant le URL</p>
            <label className="bold_16_20">L'url de la vidéo</label>
            <input type="text" />
          </Col>
        </Row>
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
          circle={false}
          width={250}
          height={250}
        />
      </Container>
    </PageTemplate>
  );
};
export default observer(CreateCampaign);
