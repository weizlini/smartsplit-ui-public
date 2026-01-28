import React, { useState } from "react";

const Access = () => {
  const [pass, setPass] = useState("");
  const submit = () => {
    window.sessionStorage.setItem("access", pass);
    window.location.reload();
  };
  return (
    <div
      style={{
        background: "#eee",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      <div
        style={{
          height: "200px",
          background: "#ddd",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <p style={{ flexGrow: 0, height: "40px" }}>
          Tapez le mot de passe pour avoir accès au site
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0,
          }}
        >
          <input
            type={"password"}
            style={{
              width: "200px",
              marginRight: "10px",
              borderColor: "#999",
              borderRadius: 3,
            }}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
          />
          <button
            style={{
              whiteSpace: "nowrap",
              background: "#2da84f",
              border: "1px solid #2da84f",
              fontSize: "16px",
              fontFamily: '"IBMPlexSans-Bold", sans-serif',
              borderRadius: "2px",
              color: "#fff",
              height: "40px",
            }}
            onClick={() => {
              submit();
            }}
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};
export default Access;
