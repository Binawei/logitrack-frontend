import React, { useState } from "react";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import "../css/change-password.css"

export default function ChangePassword() {
    // const navigate = useNavigate();
    const [newpassword, setNewpassword] = useState("");
    const handlechangepassword = async () => {

    }

    return (
        <>

        <div className="logo">
            <div><img className="" alt="" src="/logo.png" /></div>
            <div><img className="LogiTrack" alt="" src="/LogiTrack.png" /></div>
        </div>
         
        <div className="container3">
            
            <div className="popbox3">
                <h2> Reset Password</h2>
                <span className="password-input">New Password</span>

                <img className="key" alt="" src="/key-alt.png" />
                <input
                type="text"
                id="input2"
                name=""
                placeholder="Enter your new password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                />

                <span className="password-input">Confirm Password</span>

                <img className="key" alt="" src="/key-alt.png" />
                <input
                type="text"
                id="input2"
                name=""
                placeholder="Confirm password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                />
           
                <a href="https://www.google.co.uk/"> <button className="reset-password"> Reset Password</button></a>
                {/* <span className="back-to-login">Back to Login</span> */}
            </div>
        </div>
        
        </>
    );
}

