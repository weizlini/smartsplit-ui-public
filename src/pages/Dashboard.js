import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { DashboardHeader } from "../components/Header";
//import { AiOutlineDollarCircle } from "react-icons/ai";
function Dashboard() {
  const [types, settypes] = useState("Musique");
  //const [value, setValue] = useState("");
  //const [page, setPage] = useState(0);
  return (
    <div className="login-back">
      <div className="sidebarCont" style={{ minHeight: "100vh" }}>
        <Sidebar />
      </div>
      <div className="contentWrapper">
        <DashboardHeader />
        <div className="dashboard-content">
          <Container fluid className="pb-5">
            <Outlet />
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Dashboard;
