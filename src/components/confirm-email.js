import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../css/confirm-email.css";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const [oneTimePassword, setOneTimePassword] = useState("");
  const [email, setEmail] = useState("");
  const handleConfirmEmail = async () => {
    try {
      console.log('Before fetch request');
      const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/confirm-account`, {
        method: 'POST',
        body: JSON.stringify({
          confirmationToken: oneTimePassword
        }),
        headers: {
          "Content-Type": 'application/json'
        },
      });
      console.log('After fetch request');

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.code === "00") {
          toast.success(responseData.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 6000,
            onClose: () => {
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            },
          });
        }
       else {
        console.log("Non-OK response status:", response.status);
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log("Failure toast should be triggered");
      console.error(error);

      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      navigate("/confirmemail");
    }
  };

  function receiveOTP() {
    navigate("/verify-email")
  }

  function returnToLogin() {
    navigate("/login")
  }
  return (
    <>
      <div className="lcontainer">
        <div className="popbox">
          <h2>Verify your email</h2>
          <p className="hi">Hi there, enter the OTP sent to your email and start enjoying LogiTrack</p>
          <input
            type="text"
            id="input1"
            name=""
            placeholder="One Time Password"
            value={oneTimePassword}
            onChange={(e) => setOneTimePassword(e.target.value)}
          />
          <button className="verifyemail" onClick={handleConfirmEmail}>Submit</button>
          <p className="hi">
            Did not receive any OTP? <span className="resend-otp" onClick={receiveOTP}>Resend OTP</span>
          </p>
        </div>
      </div>
    </>
  );
}
