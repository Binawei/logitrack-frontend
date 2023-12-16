import { useState } from "react";
import styles from "../styles/signUp.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);

  const handleFullnameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  async function signup() {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        return;
      }
     
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      const isPasswordValid = passwordRegex.test(password);
      if (!isPasswordValid) {
        toast.error("Password must have 6-20 character with one lowercase, one uppercase and one number", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }

      if (!fullName & !email & !password & !confirmPassword & !phoneNumber) {
        toast.error("All fields are required", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        return;
      }

      console.warn(fullName, email, phoneNumber, password)

      const result = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password, confirmPassword, phoneNumber }),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });
      const responseData = await result.json();
      console.log(responseData);


      if (responseData.message === "Registration Successful, Please check your email to verify your account") {
        toast.success(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            setTimeout(() => {
              navigate("/confirmemail");
            }, 5000);
          }
        }
        )


      } if (responseData.message === "Mail server connection failed. Failed messages: jakarta.mail.MessagingException: Got bad greeting from SMTP host: smtp.gmail.com, port: 587, response: 421 Service not available\n") {
        toast.error(" SMTP service not available, please try again", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          onClose: () => {
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
            setTimeout(() => {
              navigate("/login")
            }, 2000);
          },
        });
      } if (responseData.message === "User Already Exist") {
        toast.error("User Already Exist", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          onClose: () => {
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
            setTimeout(() => {
              navigate("/signup")
            }, 2000);
          },
        });
      }

      else {
        navigate("/signup");
      }
    } catch (error) {
      console.error(error);
      console.log("Failure toast now should be triggered");
      console.log(error)
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000
      });
      // navigate("/signup");
    }

  };
  const handleToLogin = () => {
    navigate("/login")
  };

  return (
    <form>
      <div className={styles.signUp}>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <img
              className={styles.frameChild}
              alt=""
              src="/frame-38813362.svg"
            />
            <b className={styles.logitrack}>LogiTrack</b>
          </div>
          <div className={styles.getStartedWithLogictrackParent}>
            <b className={styles.getStartedWith}>Get Started with LogiTrack</b>
            <div className={styles.frameContainer}>
              <div className={styles.frameDiv}>
                <div className={styles.frameWrapper}>
                  <div className={styles.frameDiv}>
                    <div className={styles.fullName}>Full Name</div>
                    <input
                      type="text"
                      className={`${styles.buttondefault} ${styles.noLeftPadding}`}
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={handleFullnameChange}
                    />
                    <img className={styles.iconadd} alt="" src="/iconadd.svg" />
                  </div>
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.frameDiv}>
                    <div className={styles.frameDiv}>
                      <div className={styles.fullName}>Email</div>
                      <input
                        type="email"
                        className={`${styles.buttondefault} ${styles.noLeftPadding}`}
                        placeholder="Type your Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <img
                        className={styles.iconadd}
                        alt=""
                        src="/iconadd.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <div className={styles.frameDiv}>
                      <div className={styles.frameDiv}>
                        <div className={styles.fullName}>Password</div>
                        <input
                          type={passwordToggle ? "text" : "password"}
                          className={`${styles.buttondefault} ${styles.noLeftPadding}`}
                          placeholder="Type your password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "0",
                        right: "0",
                        cursor: "pointer",
                        top: "334px",
                        right: "60px",
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
                        <img
                          className={styles.iconadd}
                          alt=""
                          src="/iconadd.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.frameWrapper}>
                      <div className={styles.frameDiv}>
                        <div className={styles.frameDiv}>
                          <div className={styles.fullNames}>Confirm Password</div>
                          <input
                            type={passwordToggle ? "text" : "password"}
                            className={`${styles.buttondefault} ${styles.noLeftPadding}`}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                          <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "0",
                        right: "0",
                        cursor: "pointer",
                        top: "412px",
                        right: "60px",
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
                          <img
                            className={styles.iconadd}
                            alt=""
                            src="/iconadd.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameDiv}>
                    <div className={styles.frameDiv}>
                      <div className={styles.fullName}>Phone number</div>
                      <input
                        type="text"
                        className={`${styles.buttondefault} ${styles.noLeftPadding}`}
                        placeholder="Type your phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                      <img
                        className={styles.iconadd}
                        alt=""
                        src="/iconadd.svg"
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className={styles.buttondefault4}>
                <img className={styles.iconadd} alt="" src="/iconadd.svg" />
                <div className={styles.fullName} onClick={() => {
                  { signup() }
                  setTimeout(() => {
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setPhoneNumber("");
                  }, 500);
                }}>Sign Up</div>
                <img className={styles.iconadd} alt="" src="/iconadd.svg" />
              </div>
            </div>
            <div onClick={handleToLogin}>
              <span>
                <span>Already have an account?</span>
                <span className={styles.span}>{` `}</span>
              </span>
              <span className={styles.login} >Login</span>
            </div>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameItem} />
          <img
            className={styles.shutterstockXqkcspkihn1Icon}
            alt=""
            src="/shutterstockxqkcspkihn-1@2x.png"
          />
        </div>
      </div>
    </form>
  );
}

export default Signup;