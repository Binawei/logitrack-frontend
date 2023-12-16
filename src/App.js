import "./App.css";
import SIGNUP from "./components/SIGNUP";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import ChangePassword from "./components/change-password";
import ConfirmEmail from "./components/confirm-email";
import EmailConfirmation from "./components/email-confirmation";
import ResetPassword from "./components/reset-password";
import PriceCalculation from "./components/PriceCalculation";
import SuccesfullPayment from "./components/Successfull-payment";
import CreateOrderForm from "./components/CreateOrderForm";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Track from "./components/Track";
import ASSIGNEDTICKET from "./components/dispatch-rider-ui/components/ASSIGNEDTICKET";
import MakePayment from "./components/MakePayment";
import CalculatePrice from "./components/CalculatePrice";
import RiderTable from "./components/admin-ui/AllRidersTable";
import RiderProfileModal from "./components/admin-ui/RiderProfileModal";
import PaystackPay from "./components/PayStackPay";
import PayStackSuccess from "./components/PayStackSuccess";
import AdminTracking from "./components/admin-ui/AdminTrackText";
import ActiveTracking from "./components/admin-ui/AdminTracking";
import AdminLogin from "./components/admin-ui/AdminLogin";
import AdminForgotPassword from "./components/admin-ui/AdminForgotPassword";
import AdminResetPassword from "./components/admin-ui/AdminResetPassword";
import AdminEmailConfirmation from "./components/admin-ui/AdminEmailConfirmation";
import Orders from "./components/admin-ui/AdminOrderTable"
import GeneralPage from "./components/admin-ui/GeneralPage";
import VerifyEmail from "./components/VerifyEmail";
import ProfileDetails from "./components/ProfileDetails";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SIGNUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profilemodal" element={<RiderProfileModal />} />
        <Route path="/allridertable" element={<RiderTable />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/confirmemail" element={<ConfirmEmail />} />
        <Route path="/emailconfirmation" element={<EmailConfirmation />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/pricecalculation" element={<PriceCalculation />} />
        <Route path="/sucesspayment" element={<SuccesfullPayment />} />
        <Route path="/createorder" element={<CreateOrderForm />} />
        <Route path="/user-track" element={<Track />} />
        <Route path="/ticket-assigned" element={<ASSIGNEDTICKET />} />
        <Route path="/cal-price" element={<CalculatePrice />} />
        <Route path="/pay-order" element={<MakePayment />} />
        <Route path="/paystack-pay" element={<PaystackPay />} />
        <Route path="/paystack-success" element={<PayStackSuccess />} />
        <Route path="/admin-track" element={<AdminTracking />} />
        <Route path="/admin-track-active" element={<ActiveTracking />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-forgotpassword" element={<AdminForgotPassword />} />
        <Route path="/admin-resetpassword" element={<AdminResetPassword />} />
        <Route path="/admin" element={<AdminEmailConfirmation />} />
        <Route path="/admin-dashboard/*" element={<GeneralPage />} />
        <Route path="/viewprofile" element={<ProfileDetails />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
