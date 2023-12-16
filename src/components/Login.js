import React from 'react'
import { useState } from 'react'
import "../css/login.css"
import image from '../assets/Shutterstock-xqkCSpKIhn 1.png'
import { BsCircleFill } from 'react-icons/bs'
import { TbBus } from 'react-icons/tb'
import { MdOutlineMail } from 'react-icons/md'
import { GoKey } from 'react-icons/go'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/signUp.module.css";
import jwt_decode from 'jwt-decode';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordToggle, setPasswordToggle] = useState(false);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleVerifyAccount = async () => {
    const response = await fetch(`${process.env.REACT_APP_GO_CASH_BASE_URL}/auth/regenerate-verification-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const responseData = await response.json();
    if (responseData.code === "00") {
      toast.success(responseData.status, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        onClose: () => {
          setTimeout(() => {
            navigate("/confirmemail");
          }, 2000);
        },
      });
    } if (responseData.message === "Mail server connection failed. Failed messages: jakarta.mail.MessagingException: Got bad greeting from SMTP host: smtp.gmail.com, port: 587, response: 421 Service not available\n") {
      toast.error(" SMTP service not available, please try again", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        onClose: () => {
          setTimeout(() => {
          }, 2000);
        },
      });
    }
    else {
      toast.error(responseData.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    // navigate("/confirmemail")
  }

  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token");
      toast.error("Invalid token. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return { role: 'guest' };
    }
  };
  function forgotPassword() {
    navigate("/resetpassword")
  }

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();
      if (responseData.code === "00") {
        const userRole = decodeToken(responseData.data.token).role;
        localStorage.setItem('bearerToken', JSON.stringify(responseData.data.token));

        toast.success(responseData.status, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          onClose: () => {
            setTimeout(() => {
              if (userRole === 'ADMIN') {
                navigate("/admin-dashboard");
              } else if (userRole === 'CUSTOMER') {
                navigate("/dashboard");
              } else {
                navigate("/ticket-assigned");
              }
            }, 2000);
          },
        });
      } else {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/login");
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
      <div className='general-login'>
        <div className='img-form'>
          <div className='logitracks'>
            <div className='text'>
              <BsCircleFill className='circle-icon' />
              <TbBus className='bus-icon' /> <p>LogiTrack</p>
            </div>
            <div className='form1'>
              <h3>Hi, Welcome back</h3>
              <form>
                <div className='form-group'>
                  <label htmlFor='email'><p>Email</p></label>
                  <div className='input-cont'>
                    <div>
                      <MdOutlineMail className='email-icon' />
                    </div>
                    <input type='email' className={`${styles.passwordbutton} ${styles.noLeftPadding}`} id='email' name='email' value={email} onChange={handleUsernameChange} placeholder='Enter your email' />
                  </div>

                </div>

                <div className='form-group'>
                  <label htmlFor='password'><p>Password</p></label>
                  <div className="input-cont">
                    <div>
                      <GoKey className="passwordkey" />
                    </div>
                    <input
                      className={`${styles.passwordbutton} ${styles.noLeftPadding}`}
                      type={passwordToggle ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                    />
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        cursor: "pointer",
                        top: "457px",
                        left: "575px",
                      }}
                    >
                      <img
                        alt=""
                        src={passwordToggle ? "/eye-see.svg" : "/eye-hide.svg"}
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                        onClick={() => {
                          setPasswordToggle(!passwordToggle);
                          console.log("passwordToggle state:", passwordToggle);
                        }}
                      />
                    </div>
                  </div>

                </div>
                <p id='forgotpassword' onClick={forgotPassword}>Forgot password?</p>
                <button type='button' className='submitlogin' onClick={() => {
                  { handleSignIn() }
                  setTimeout(() => {
                    setEmail("");
                    setPassword("");
                  }, 500);
                }}>Login</button>
              </form>
              <p>Don’t have an account? <span className='registeraccout' onClick={handleCreateAccount}>Create account</span></p>
              <p className='verifyAccount'>Haven't verified your account yet? <span className='registeraccout' onClick={handleVerifyAccount}>Verify account</span></p>
            </div>
          </div>

          <div className='imagediv'>
            <img src={image} alt='images' className='loginimage' />
          </div>


        </div>
      </div>

    </div>
  )
}
export default Login
