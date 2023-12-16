import React from "react";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import "../../css/email-confirmation.css";

export default function AdminEmailConfirmation() {
  // const navigate = useNavigate();
  const handleemailconfirmation = async () => {};

  return (
    <>
      <div className="container1">
        <div className="popbox1">
          <h2> Check your mail</h2>
          <p className="we-sent">
            {" "}
            We sent a password reset link to your email. Please click the link
            to reset your password.{" "}
          </p>
          <p className="we-sent">
            {" "}
            Don't received an email?{" "}
            <a href="#">
              <span className="resend">Click to Resend</span>
            </a>{" "}
          </p>
          <a href="https://www.google.co.uk/">
            <button className="verifyemail"> Back to Login</button>
          </a>
        </div>
      </div>
    </>
  );
}
