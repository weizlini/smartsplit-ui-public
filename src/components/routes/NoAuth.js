import { useNavigate, RouteProps, useLocation } from "react-router-dom";
import { useStorePath } from "../../state";
import AuthState from "../../state/AuthState";
import UserModel from "../../state/models/UserModel";
import { useEffect } from "react";
import UserState from "../../state/UserState";

const NoAuth = (props: RouteProps) => {
  const navigate = useNavigate();
  const auth: AuthState = useStorePath("auth");
  const user: UserState = useStorePath("user");
  const location = useLocation();
  //console.log(location.pathname);

  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  });

  return <>{props.children}</>;
};
export default NoAuth;
