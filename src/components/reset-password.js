import React, { useState } from "react";
// import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/reset-password.css"
import styles from "../styles/signUp.module.css";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleresetpassword = async () => {

    }
    function login() {
        navigate("/login")
    }

    return (
        <>
            <div className="logo">
                <div><img className="" alt="" src="/logo.png" /></div>
                <div><img className="LogiTrack" alt="" src="/LogiTrack.png" /></div>
            </div>
            <div className="container2">

                <div className="popbox2">
                    <h2 className="forgot-password"> Forgot Password</h2>
                    <p className="hey"> Enter the email associated with your account and we'll send an email with instruction to reset your password </p>
                    <span className="email-input">Email</span>

                    <img className="mail-box" alt="" src="/mail-alt-1.png" />
                    <input
                    className = {`${styles.noLeftPadding} resetpassword-input`}
                    type="text"
                    id="resetpassword-input"
                    name=""
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <a href="https://www.google.co.uk/"> <button className="reset-password"> Reset Password</button></a>
                    <span className="back-to-login" onClick={login}>Back to Login</span>
                </div>
            </div>

        </>
    );
}

