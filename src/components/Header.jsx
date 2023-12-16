import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
const Header = () => {
  const navigate = useNavigate();

  const onPrimaryButtonContainerClick = useCallback(() => {
    navigate("/signup");
  }, []);

  const onLoginTextClick = useCallback(() => {
    navigate("/login");
  });

  const onServicesTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-child" />
      <div className="primarybutton" onClick={onPrimaryButtonContainerClick}>
        <b className="sign-up">SignUp</b>
      </div>
      <div className="login" onClick={onLoginTextClick}>
        Login
      </div>
      <div className="home-parent">
        <b className="home">Home</b>
        <div className="about-us">About Us</div>
        <div className="services" onClick={onServicesTextClick}>
          Services
        </div>
        <div className="contact">Contact</div>
        <div className="line-div" />
      </div>
      <img
        className="icoutline-dark-mode-icon"
        alt=""
        src="/icoutlinedarkmode.svg"
      />
      <div className="frame-parent8">
        <img className="frame-child22" alt="" src="/logitrack-logo.svg" />
        <b className="logitrack1">LogiTrack</b>
      </div>
    </div>
  );
};

export default Header;
