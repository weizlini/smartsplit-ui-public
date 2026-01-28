import AuthState from "../../state/AuthState";
import { useStorePath } from "../../state";
import { observer } from "mobx-react-lite";
import React from "react";
import LoggedInHeader from "./LoggedInHeader";
import PublicHeader from "./PublicHeader";

const Header = () => {
  const auth: AuthState = useStorePath("auth");
  return <>{auth.token ? <LoggedInHeader /> : <PublicHeader />}</>;
};

export default observer(Header);
