import "../css/MakePayment.css";
import { useCallback, useState } from "react";
import PayStackPay from "./PayStackPay";
import PortalPopup from "./admin-ui/PortalPopup";

const MakePayment = (props) => {

  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  const openPaystackOpen = () => {
    setIsPaystackOpen(true);
  };

  const closePaystackOpen = () => {
    setIsPaystackOpen(false);
  }

    const amountInNaira = JSON.parse(localStorage.getItem("totalCost"));
    const formattedAmount = `₦${amountInNaira.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    localStorage.setItem('formatAmount', JSON.stringify(formattedAmount));

    const MakePayment = useCallback(() => {
      openPaystackOpen();

    
      }, []);

  return (
    <div className="create-orderform-mp">
      <div className="frame-parent-mp">
        <div className="total-price-wrapper-mp">
          <div className="total-price-mp">Total Price</div>
        </div>
        <div className="divider-mp" />
      </div>
      <div className="the-total-amount-to-be-paid-is-parent-mp">
        <div className="the-total-amount-mp">
          The total amount to be paid is calculated based on weight and location
        </div>
        <b className="n10500-mp">{formattedAmount}</b>
      </div>
      <div className="frame-group-mp">
        <div className="buttondefault-wrapper-mp">
          <div className="buttondefault-mp" style={{ cursor: "pointer" }} onClick={() => {
    MakePayment();
}} >
            <img className="key-alt-icon-mp" alt="" src="/keyalt.svg" />
            <div className="text-mp">Make Payment</div>
            <img className="key-alt-icon-mp" alt="" src="/iconadd.svg" />
          </div>
        </div>
        <div className="buttondefault-container-mp">
          <div className="buttondefault1-mp"  style={{ cursor: "pointer" }} onClick={props.onClose}>
            <img className="key-alt-icon-mp" alt="" src="/keyalt1.svg" />
            <div className="text1-mp" onClick={props.isedit}>Edit Order</div>
            <img className="key-alt-icon-mp" alt="" src="/iconadd1.svg" />
          </div>
        </div>
      </div>
      {isPaystackOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePaystackOpen}
        >
          <PayStackPay onClose={closePaystackOpen} 
          setRender={props.setRender} 
          closecreateorder={props.closecreateorder} 
          closePaymentModal={props.closePaymentModal} 
          closecalprice = {props.closecalprice} />
        </PortalPopup>
      )}
    </div>
  );
};

export default MakePayment;
