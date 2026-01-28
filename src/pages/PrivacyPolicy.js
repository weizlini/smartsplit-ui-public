import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import PageTemplate from "../components/PageTemplate";
import { Col, Container, Row } from "react-bootstrap";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <PageTemplate>
      <Container>
        <div className="legal-page">
          <Row className="justify-content-center">
            <Col
              xs={12}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              className=" mt-5 justify-content-center"
            >
              <h2 className="medium_40_20">Politique de confidentialité</h2>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                id risus non tellus tincidunt consequat. Suspendisse elementum
                rhoncus tortor, euismod faucibus risus feugiat eget. Nullam sit
                amet condimentum urna. Nullam ac sem enim. Quisque est diam,
                hendrerit ac purus a, aliquam laoreet erat. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Nam efficitur
                justo eget mauris dapibus, id efficitur massa mollis. Proin
                viverra, nulla sed rutrum molestie, risus felis facilisis nibh,
                vitae lobortis nunc ipsum eget libero. Morbi malesuada non massa
                ut molestie.
              </p>

              <p>
                Aliquam erat volutpat. Aenean aliquam augue vehicula magna
                tristique, ac dictum nunc mattis. Vestibulum eu ex ut ligula
                viverra viverra vel sed nulla. Nam semper vel orci a feugiat.
                Curabitur sed scelerisque elit, nec facilisis urna. Nulla
                commodo porta arcu. Nunc convallis lobortis lacus. Nullam
                dignissim, risus sed egestas consequat, tellus nisi ullamcorper
                tortor, vitae rhoncus odio leo sit amet elit. Vivamus non metus
                sit amet mi mollis mollis at a diam. Nunc maximus felis quis
                suscipit luctus. Pellentesque a ante eros. Cras aliquet, augue
                varius consectetur vestibulum, quam mauris facilisis est, sit
                amet fermentum erat dolor ac ex. Donec urna arcu, rutrum id
                velit sit amet, hendrerit dapibus lacus. Nulla et mi eget diam
                placerat dapibus vitae sed magna. Aliquam iaculis lorem justo,
                ut consequat lectus elementum ut. Nullam vulputate, tortor
                fermentum efficitur lacinia, magna neque suscipit felis, sit
                amet bibendum odio arcu ac nisl.
              </p>
              <p>
                Nullam at eleifend nisi, nec luctus nisi. Ut ac nunc vitae sem
                eleifend pretium vitae eget erat. Aliquam in ligula massa. Sed
                ultricies nulla non nisl varius consectetur. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Aenean pretium vestibulum nisl in tempor. Nunc
                facilisis quis erat at varius. Etiam tristique arcu at mauris
                posuere, eget laoreet ante rutrum. Donec quis odio fermentum,
                placerat magna vitae, posuere ex. Vestibulum ut risus eget orci
                rutrum congue. Nulla eu aliquet arcu. Donec ac turpis in eros
                interdum efficitur id id ex. Curabitur egestas egestas sodales.
                In maximus lacus sit amet neque feugiat, in pharetra nisl
                rutrum.
              </p>

              <p>
                Donec sit amet metus ipsum. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Mauris ultrices odio at augue ultrices
                porttitor. Suspendisse ipsum dolor, efficitur sed auctor eget,
                tincidunt vel elit. Vivamus a mi metus. Suspendisse vel maximus
                sapien. Vestibulum eget erat nisi. Vivamus non eros et urna
                bibendum malesuada.
              </p>

              <p>
                Ut porta est efficitur, semper urna eu, sodales velit. Aliquam
                erat volutpat. Ut posuere pretium arcu. Cras dolor sapien,
                pretium eget faucibus eu, rutrum non leo. Fusce vulputate ante
                vitae magna rutrum sagittis. Integer vel nisi finibus, sagittis
                ipsum et, sagittis lectus. Phasellus in tortor ut ex mattis
                facilisis sit amet ut dui. Mauris id nisi quis quam vehicula
                auctor ac ac metus. Sed porta volutpat arcu a tempus. Nulla
                blandit, purus ac tincidunt lacinia, nisi purus bibendum urna,
                non tincidunt eros dui et justo.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </PageTemplate>
  );
};
export default observer(PrivacyPolicy);
