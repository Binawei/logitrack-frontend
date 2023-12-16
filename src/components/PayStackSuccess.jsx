import "../css/PayStackSuccess.css";
import { useNavigate } from "react-router-dom";

const PayStackSuccess = (props) => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleViewOrderStatus = () => {
    props.setRender(false);
    navigate("/dashboard", { replace: true });
    props.closecreateorder();
    props.closePaymentModal();
    props.closepaymentprocess();
    props.closePaystackOpen();
    props.closecalprice();
  };

  return (
    <div className="success-pss">
      <div className="frame-parent-pss">
        <div className="total-price-wrapper-pss">
          <div className="total-price">Total Price</div>
        </div>
        <div className="divider-pss" />
      </div>
      <div className="frame-group-pss">
        <div className="frame-container-pss">
          <div className="frame-wrapper-pss">
            <div className="frame-container-pss">
              <img className="image-5-icon-pss" alt="" src="/paystack.png" />
              <div className="maryokaforgmailcom-parent-pss">
                <div className="maryokaforgmailcom-pss">{props.email}</div>
                <b className="ngn-10000-pss">{props.totalAmount}</b>
              </div>
            </div>
          </div>
          <div className="success-parent-pss">
            <img className="success-icon-pss" alt="" src="/pay-success.svg" />
            <div className="payment-successful-pss">
              <p className="payment-pss">Payment</p>
              <p className="payment-pss">Successful</p>
            </div>
          </div>
        </div>
        <div className="your-transaction-reference-is-parent-pss">
          <div className="maryokaforgmailcom-pss">
            <p className="payment-pss-ref">Your transaction reference is</p>
            <p className="t91827364773288-pss">{props.reference}</p>
          </div>
          <div className="key-alt-parent-pss">
            <img className="key-alt-icon-pss" alt="" src="/key-alt.svg" />
            <div className="secured-pss">SECURED BY PAYSTACK</div>
          </div>
        </div>
        <div className="buttondefault-print" style={{ cursor: "pointer" }} onClick={handlePrint}>
        Print Receipt
      </div>
      <p className="payment-pss-ref"> View Order Status <span className='migrate-dash' onClick={handleViewOrderStatus}> <u>Click Here</u></span></p>
      </div>
    </div>
  );
};

export default PayStackSuccess;
