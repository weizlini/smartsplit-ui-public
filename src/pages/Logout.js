import { observer } from "mobx-react-lite";
import { useStorePath } from "../state";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = useStorePath("auth");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function doLogOut() {
      try {
        await auth.logout();
        navigate("/login");
      } catch (e) {
        setError(true);
      }
    }
    if (auth.token) {
      doLogOut().then();
    }
  });
  if (error)
    return (
      <div className="full-page-center">
        <h2>Error Logging out</h2>
      </div>
    );
  return null;
};
export default observer(Logout);
