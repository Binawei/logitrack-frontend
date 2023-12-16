import React from "react";
import { useState } from "react";
import "../../css/login.css";
import image from "../../assets/Shutterstock-xqkCSpKIhn 1.png";
import { BsCircleFill } from "react-icons/bs";
import { TbBus } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    console.log("About log-in in")
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
        console.log(response)
      const responseData = await response.json();
      if (responseData.code === "00") {
        localStorage.setItem(
          "bearerTokenAdmin",
          JSON.stringify(responseData.data.token)
        );
        // localStorage.setItem("bearerToken", JSON.stringify(responseData.data));
        toast.success(responseData.status, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 2000);
          },
        }); 
      } else {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/admin-login");
      }
    } catch (error) {
      console.log("Failure toast should be triggered");
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="general-login">
        <div className="img-form">
          <div className="logitracks">
            <div className="text">
              <BsCircleFill className="circle-icon" />
              <TbBus className="bus-icon" /> <p>LogiTrack</p>
            </div>
            <div className="form1">
              <h3>Hi, Welcome back</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="email">
                    <p>Email</p>
                  </label>
                  <MdOutlineMail className="email-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleUsernameChange}
                    placeholder=" Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <p>Password</p>
                  </label>
                  <GoKey className="passwordkey" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                  />
                </div>
                <p id="forgotpassword">Forgot password?</p>
                <button
                  type="button"
                  className="submitlogin"
                  onClick={handleSignIn}
                >
                  Login
                </button>
              </form>
              <p>
                Don’t have an account?{" "}
                <span className="registeraccout" onClick={handleCreateAccount}>
                  Create account
                </span>
              </p>
            </div>
          </div>

          <img src={image} alt="images" className="loginimage" />
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
