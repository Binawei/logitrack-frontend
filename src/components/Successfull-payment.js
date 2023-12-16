import "../css/Successfull-payment.css";
import success from "../assets/success.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const SuccesfullPayment = () => {
  const navigate = useNavigate();
  const onDashboardClick = useCallback(() => {
    navigate("/dashboard");
  });
  return (
    <div className="create-orderform">
      <img className="success-icon" alt="" src={success} />
      <div className="successfully-parent">
        <b className="successfully">Successfully</b>
        <div className="your-requested-has">
          Your requested has been completed. Check your email to track your
          item.
        </div>
      </div>
      <div className="create-orderform-inner">
        <div className="buttondefault-wrapper">
          <div className="buttondefault">
            {/* <img className="key-alt-icon" alt="" src="/keyalt.svg" /> */}
            <div className="text" onClick={onDashboardClick} >Go back to Dashboard</div>
            {/* <img className="key-alt-icon" alt="" src="/keyalt.svg" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccesfullPayment;
