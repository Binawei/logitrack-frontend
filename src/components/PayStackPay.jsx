import { useState, useCallback } from "react";
import "../css/PaystackPay.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PayStackSuccess from "./PayStackSuccess";
import PortalPopup from "./admin-ui/PortalPopup";
import PaymentProcess from "./PaymentProcess";

const PayStackPay = (props) => {

    const [isSuccessPayment, setIsSuccessPayment] = useState(false);
    const [reference, setReference] = useState("");
    const [email, setEmail] = useState("");

    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  
    const openSuccessModal = useCallback(() => {
      setSuccessModalOpen(true);
    }, []);
  
    const closeSuccessModal = () => {
      setSuccessModalOpen(false);
    }

    const closeSuccessPayment = () => {
        setIsSuccessPayment(false);
      }
      const openSuccessPayment = () => {
        setIsSuccessPayment(true);
      }

const navigate = useNavigate();

const localAmount = JSON.parse(localStorage.getItem("formatAmount"));
const cleanAmount = localAmount ? localAmount.replace(/₦|,/g, '') : "";

const handlePayment = useCallback(async () => {
    const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));

    try {
        const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/payment-gateway/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearerToken,
            },
            body: JSON.stringify({
                amount: cleanAmount
            }),
        });

        const responseData = await response.json();

        if (responseData.code === "00") {
            setReference(responseData.data.reference);
            const retrivedReference = responseData.data.reference;

            const verifyResponse = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/payment-gateway/verify?request=${retrivedReference}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: bearerToken,
                },
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.code === "00") {
                setEmail(verifyData.data.customer.email);
                openSuccessPayment();
            } else {
                toast.error(verifyData.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
                navigate("/pay-order");
            }
        } else {
            toast.error(responseData.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
            navigate("/paystack-pay");
        }
    } catch (error) {
        console.log("Failure toast should be triggered");
        toast.error(error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
        });
        navigate("/paystack-pay");
    }
}, []);

  return (
    <div className="sdk">
      <div className="pay-with-paystack-parent">
        <b className="pay-with-paystack">Pay with Paystack</b>
        <img
          className="cancel-icon"
          alt=""
          src="/cancel.svg"
          onClick={props.onClose}
        />
      </div>
      <div className="frame-parent-pp">
        <div className="frame-group-pp">
          <div className="frame-wrapper-pp">
            <div className="frame-container-pp">
              <div className="payment-method-wrapper">
                <div className="payment-method">Payment Method</div>
              </div>
              <div className="buttondefault-pp">
                <img className="key-alt-icon-pp" alt="" src="/keyalt.svg" />
                <div className="text-pp">Paystack</div>
                <img
                  className="key-alt-icon-pp"
                  alt=""
                  src="/iconarrow-down.svg"
                />
              </div>
            </div>
          </div>
          <div className="frame-wrapper-pp">
            <div className="frame-container-pp">
              <div className="payment-method-wrapper">
                <div className="payment-method">Amount</div>
              </div>
              <div className="buttondefault-pp">
                <img className="key-alt-icon-pp" alt="" src="/keyalt1.svg" />
                <div className="text-pp">{localAmount}</div>
                <img
                  className="key-alt-icon-pp"
                  alt=""
                  src="/iconarrow-down1.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttondefault2-pp" style={{ cursor: "pointer" }} onClick={() => {
              openSuccessModal();
              setTimeout(() => {
                handlePayment();
              }, 3000);
            }}>
          <img className="key-alt-icon-pp" alt="" src="/keyalt2.svg" />
          <div className="text2-pp" >Pay</div>
          <img className="key-alt-icon-pp" alt="" src="/iconadd.svg" />
        </div>
      </div>
      {isSuccessModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSuccessModal}
        >
          <PaymentProcess onClose={closeSuccessModal} />
        </PortalPopup>
      )}

      {isSuccessPayment && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSuccessPayment}
        >
          <PayStackSuccess onClose={closeSuccessPayment} 
          totalAmount={localAmount} reference={reference} 
          email={email}
          setRender={props.setRender}
          closecreateorder={props.closecreateorder} 
          closePaymentModal={props.closePaymentModal} 
          closepaymentprocess={closeSuccessModal} 
          closePaystackOpen={props.onClose} 
          closecalprice = {props.closecalprice} />
        </PortalPopup>
      )}
    </div>
  );
};

export default PayStackPay;
