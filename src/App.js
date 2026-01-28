import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import Http404 from "./pages/error/Http404";
import Auth from "./components/routes/Auth";
import NoAuth from "./components/routes/NoAuth";
import Forgot from "./pages/Forgot";
import ForgotEmailSent from "./pages/forgotEmailSent";
import VerifyCode from "./pages/VerifyCode";
import React, { useEffect, useState } from "react";
import Logout from "./pages/Logout";
import Campaign from "./pages/Campaign";
import UploadTest from "./pages/UploadTest";
import ChangePassword from "./pages/ChangePassword";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import InvestCampaign from "./pages/InvestCampaign";
import InvestShares from "./components/invest/InvestShares";
import ConfirmInvestment from "./components/invest/ConfirmInvestment";
import AddZumPaymentMethod from "./components/invest/AddZumPaymentMethod";
import PaymentError from "./components/invest/PaymentError";
import FinalizePayment from "./components/invest/FinalizePayment";
import PaymentSuccess from "./components/invest/PaymentSuccess";
import MyInvestments from "./components/dashboard/MyInvestments";
import MyRevenue from "./components/dashboard/MyRevenue";
import MyPublicProfile from "./components/dashboard/MyPublicProfile";
import TestReactParse from "./pages/TestReactParse";
import TestCK from "./pages/TestCK";
import CreateCampaign from "./pages/CreateCampaign";
import KonvaTest from "./pages/KonvaTest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import SelectWithdrawMethod from "./components/withdraw/SelectWithdrawMethod";
import ProcessWithdraw from "./components/withdraw/ProcessWithdraw";
import WithdrawalSuccess from "./components/withdraw/WithdrawalSuccess";
import WithdrawalError from "./components/withdraw/WithdrawalError";
import Withdraw from "./components/dashboard/Withdraw";
import MethodDetails from "./components/withdraw/MethodDetails";
import RedirectToRevenue from "./components/withdraw/RedirectToRevenue";
// import Access from "./pages/Access";
// prettier-ignore
function App() {
    /*const [access, setAccess] = useState(window.sessionStorage.getItem("access"));
    if (!access || access !== "boucanebleue")
      return (
        <Routes>
          <Route path="*" element={<Access />}></Route>
        </Routes>
      );*/
    return (
        <Routes>
            {/* react router v6 forces me to have every single route in the same file... pathetic */}
            <Route path="/" element={<Home/>}></Route>
            <Route
                path="/dashboard/*"
                element={
                    <Auth>
                        <Dashboard/>
                    </Auth>
                }
            >
                <Route index element={<Auth><MyInvestments/></Auth>}/>
                <Route path="investments" element={<Auth><MyInvestments/></Auth>}/>
                <Route path="revenue" element={<Auth><MyRevenue/></Auth>}/>
                <Route path="revenue/withdraw/*" element={<Auth><Withdraw/></Auth>}>
                    <Route index element={<Auth><SelectWithdrawMethod/></Auth>}/>
                    <Route path="select-method" element={<Auth><SelectWithdrawMethod/></Auth>}/>
                    <Route path="method-details" element={<Auth><MethodDetails/></Auth>}/>
                    <Route path="process" element={<Auth><ProcessWithdraw/></Auth>}/>
                    <Route path="success" element={<Auth><WithdrawalSuccess/></Auth>}/>
                    <Route path="error" element={<Auth><WithdrawalError/></Auth>}/>
                    <Route path="*" element={<Auth><RedirectToRevenue/></Auth>}/>
                </Route>
                <Route path="public-profile" element={<Auth><MyPublicProfile/></Auth>}/>
            </Route>
            <Route path="test-parse" element={<Auth><TestReactParse/></Auth>}/>
            <Route path="test-konva" element={<Auth><KonvaTest/></Auth>}/>
            <Route path="test-ck" element={<Auth><TestCK/></Auth>}/><Route path="/login"
                                                                           element={<NoAuth><Login/></NoAuth>}/>
            <Route path="/logout" element={<Auth><Logout/></Auth>}/>
            <Route path="/register/creator" element={<NoAuth><Register mode={"creator"}/></NoAuth>} />
            <Route path="/register/investor" element={<NoAuth><Register mode={"investor"}/></NoAuth>} />
            <Route path="/verify-email/" element={<NoAuth><EmailVerification/></NoAuth>} />
            <Route path="/verify/:code" element={<NoAuth><VerifyCode/></NoAuth>} />
            <Route path="/forgot" element={<NoAuth><Forgot/></NoAuth>} />
            <Route
                path="/onboarding"
                element={
                    <Auth>
                        <Onboarding/>
                    </Auth>
                }
            />
            <Route
                path="/reset-password/:code/"
                element={
                    <NoAuth>
                        <ChangePassword/>
                    </NoAuth>
                }
            />
            <Route
                path="/reset-password-sent"
                element={
                    <NoAuth>
                        <ForgotEmailSent/>
                    </NoAuth>
                }
            />
            <Route
                path="/upload-test"
                element={
                    <Auth>
                        <UploadTest/>
                    </Auth>
                }
            />
            <Route
                path="/create-campaign"
                element={
                    <Auth>
                        <CreateCampaign/>
                    </Auth>
                }
            />
            <Route path="/campaign/:url" element={<Campaign/>}/>
            <Route path="/campaign/:url/invest/*" element={<InvestCampaign/>}>
                <Route index element={<InvestShares/>}/>
                <Route path="shares" element={<InvestShares/>}/>
                <Route path="confirm" element={<ConfirmInvestment/>}/>
                <Route path="payment" element={<AddZumPaymentMethod/>}/>
                <Route path="finalize" element={<FinalizePayment/>}/>
                <Route path="error" element={<PaymentError/>}/>
                <Route path="success" element={<PaymentSuccess/>}/>
            </Route>
            <Route path="/page-not-found" element={<Http404/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
            <Route path="*" element={<Http404/>}/>
        </Routes>
    );
}

export default App;
