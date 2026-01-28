import { useEffect, useState } from "react";
//import { ProgressBar } from "react-bootstrap";
import { useStorePath } from "../state";
import { observer } from "mobx-react-lite";
const UploadTest = () => {
  const mediaState = useStorePath("media");
  const [file, setFile] = useState(null);
  useEffect(() => {
    mediaState.clear();
    // eslint-disable-next-line
  }, [file]);
  const uploadFile = async (file) => {
    await mediaState.uploadImage(file);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>UploadTest</h1>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files);
        }}
      />
      <button
        disabled={!file || mediaState.busy}
        onClick={() => {
          uploadFile(file);
        }}
      >
        Upload
      </button>
      {mediaState.busy ? <p>Uploading...{mediaState.progress}%</p> : null}
      {mediaState.url ? <img src={mediaState.url} alt="uploaded" /> : null}
    </div>
  );
};
export default observer(UploadTest);
