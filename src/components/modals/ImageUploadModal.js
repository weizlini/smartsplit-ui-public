import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import AvatarEditor from "react-avatar-editor";
import ReactSlider from "react-slider";
import { createMedia, getS3Signed, uploadToS3 } from "../../api/media";
import "./ImageUploadModal.css";
import { Loader } from "../Loader";
import { set } from "mobx";
const ImageUploadModal = ({
  visible,
  onSaved,
  onCancel,
  circle,
  width,
  height,
}) => {
  const [zoom, setZoom] = useState(1.5);
  const [file: File, setFile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [busy, setBusy] = useState(false);

  const editor = useRef();
  const saveImage = () => {
    if (editor.current) {
      const canvas: HTMLCanvasElement = editor.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        //const dataURL = canvas.toDataURL();
        //onSaved(blob);
        const imageFile = new File([blob], "croppedImage.png");
        setBusy(true);
        const uploadResponse = await uploadToS3([imageFile]);
        //console.log(uploadResponse);
        const saveMediaResponse = await createMedia(
          uploadResponse.mediaUrl,
          "user"
        );
        //console.log(saveMediaResponse);
        setBusy(false);
        onSaved(saveMediaResponse.data.media);
      });
    }
  };
  return (
    <Modal
      show={visible}
      onHide={() => {
        setFile(null);
        setRotation(0);
        setZoom(1.5);
        setBusy(false);
        onCancel();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {file ? (
          <div className="avatar-modal">
            <AvatarEditor
              ref={editor}
              image={file}
              width={width ? width : 250}
              height={height ? height : 250}
              border={50}
              borderRadius={!!circle ? width : 0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={zoom}
              rotate={rotation}
            />
            <div className="controls">
              <small>zoom</small>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                min={1}
                max={3}
                step={0.05}
                onChange={(value) => {
                  setZoom(value);
                }}
                value={zoom}
              />
              <small>rotate</small>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                min={0}
                max={360}
                step={0.5}
                onChange={(value) => {
                  setRotation(value);
                }}
                value={rotation}
              />
            </div>
          </div>
        ) : (
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn connect_btn"
          onClick={saveImage}
          disabled={busy || !file}
        >
          {busy ? (
            <span>
              Uploading... <Loader size={1} />{" "}
            </span>
          ) : (
            "Crop and Upload"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default ImageUploadModal;
