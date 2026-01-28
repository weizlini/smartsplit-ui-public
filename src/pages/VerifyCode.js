import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendVerificationCode } from "../api/auth";

const VerifyCode = () => {
  //const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { code } = useParams();
  console.log(`code is ${code}`);

  useEffect(() => {
    const sendCode = async (code) => {
      const success = await sendVerificationCode(code);
      if (success) {
        navigate("/login");
      } else {
        setError(true);
      }
    };
    if (code) {
      sendCode(code);
    } else {
      setError(true);
    }
  });
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <span>Verification Code is Invalid</span>
      ) : (
        <span>Verifying please Wait ....</span>
      )}
    </div>
  );
};
export default VerifyCode;
