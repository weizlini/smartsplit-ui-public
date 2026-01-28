import { useNavigate, RouteProps, useLocation } from "react-router-dom";
import { useStorePath } from "../../state";
import AuthState from "../../state/AuthState";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import UserState from "../../state/UserState";

const Auth = (props: RouteProps) => {
  const navigate = useNavigate();
  const auth: AuthState = useStorePath("auth");
  const user: UserState = useStorePath("user");
  //const location = useLocation();
  useEffect(() => {
    console.log(auth);
    console.log(user);
    if (!auth.token) {
      navigate("/login");
    }
  });

  return <>{props.children}</>;
};
export default observer(Auth);
