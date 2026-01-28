import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/routes/Auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NoAuth from "./components/routes/NoAuth";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import VerifyCode from "./pages/VerifyCode";
import Forgot from "./pages/Forgot";
import Onboarding from "./pages/Onboarding";
import ChangePassword from "./pages/ChangePassword";
import ForgotEmailSent from "./pages/forgotEmailSent";
import React from "react";

const UserRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/dashboard"
        element={
          <Auth>
            <Dashboard />
          </Auth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/logout"
        element={
          <Auth>
            <Logout />
          </Auth>
        }
      />
      <Route
        path="/register"
        element={
          <NoAuth>
            <Register />
          </NoAuth>
        }
      />
      <Route
        path="/verify-email/"
        element={
          <NoAuth>
            <EmailVerification />
          </NoAuth>
        }
      />
      <Route
        path="/verify/:code"
        element={
          <NoAuth>
            <VerifyCode />
          </NoAuth>
        }
      />
      <Route
        path="/forgot"
        element={
          <NoAuth>
            <Forgot />
          </NoAuth>
        }
      />
      <Route
        path="/onboarding"
        element={
          <Auth>
            <Onboarding />
          </Auth>
        }
      />
      <Route
        path="/reset-password/:code/"
        element={
          <NoAuth>
            <ChangePassword />
          </NoAuth>
        }
      />
      <Route
        path="/reset-password-sent"
        element={
          <NoAuth>
            <ForgotEmailSent />
          </NoAuth>
        }
      />
    </>
  );
};
export default UserRoutes;
