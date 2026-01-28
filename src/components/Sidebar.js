import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import logoSmart from "../assets/images/Smartsplit-dashboard.png";
import Pie from "./icons/Pie";
import Money from "./icons/Money";
import UserCard from "./icons/UserCard";

const Sidebar = () => {
  const location = useLocation();
  console.log(location);
  const segments = location.pathname.split("/");
  console.log(segments.length);
  let subPath;
  subPath = segments.length >= 3 ? segments[2] : "";
  if (subPath === "") subPath = "investments";
  return (
    <div className="bg_32" style={{ position: "sticky", top: "0px" }}>
      <div className="sidebar_margin">
        <div className="bg_3f p-sm-4">
          <img className="img-fluid user_profile" src={logoSmart} />
        </div>
      </div>
      <div className="bg_32" style={{ minHeight: "100vh" }}>
        <ul className="sidebar_ul pl-2">
          <li className={subPath === "investments" ? "active" : ""}>
            <Link to="/dashboard/investments">
              <span className="pr-sm-2 icon">
                <Pie active={subPath === "investments"} />
              </span>
              <span className="mobinone">Mes investissements</span>
            </Link>
          </li>
          <li className={subPath === "revenue" ? "active" : ""}>
            <Link to="/dashboard/revenue">
              <span className="pr-sm-2 icon">
                <Money active={subPath === "revenue"} />
              </span>
              <span className="mobinone">Mes revenus</span>
            </Link>
          </li>
          <li className={subPath === "public-profile" ? "active" : ""}>
            <Link to="/dashboard/public-profile">
              <span className="pr-sm-2 icon">
                <UserCard active={subPath === "public-profile"} />
              </span>
              <span className="mobinone">Mon profile public</span>
            </Link>
          </li>
        </ul>
        {/*<ul className="sidebar_ul pl-2 mt-3">
         <li><span className="pr-sm-2 color_8d twosix"><FiCheckCircle></FiCheckCircle></span> <span className="mobinone">Mes licenses</span></li>
  </ul>*/}
      </div>
    </div>
  );
};
export default observer(Sidebar);
