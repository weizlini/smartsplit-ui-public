import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import PageTemplate from "../components/PageTemplate";
import { Col, Container, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/fr";
const TestCK = () => {
  return (
    <PageTemplate>
      <Container>
        <Row className="justify-content-center">
          <Col sm={6}>
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Bonjour Monde</p>"
              config={{
                language: "fr",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                ],
                heading: {
                  options: [
                    {
                      model: "paragraph",
                      title: "Paragraph",
                      class: "ck-heading_paragraph",
                    },

                    {
                      model: "heading2",
                      view: "h2",
                      title: "Heading 2",
                      class: "ck-heading_heading2",
                    },
                    {
                      model: "heading1",
                      view: "h3",
                      title: "Heading 3",
                      class: "ck-heading_heading3",
                    },
                  ],
                },
              }}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
export default observer(TestCK);
