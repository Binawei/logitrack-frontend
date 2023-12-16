import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Image from '../assets/avatar-gen.png'
import '../css/navbar.css'
import PortalPopup from "../../src/components/admin-ui/PortalPopup";
import ProfileDetails from "./ProfileDetails";
import CreateOrderForm from "./CreateOrderForm";

const Navbar = (props) => {
  const navigate = useNavigate();

  const NavHome = useCallback(() => {
    navigate("/");
  });

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  const openProfile = useCallback(() => {
    setProfileOpen(!isProfileOpen)
  });

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);
  const CreateOrderOpen = useCallback(() => {
    setIsCreateOrderOpen(true)
  });

  const CreateOrderClose = useCallback(() => {
    setIsCreateOrderOpen(false);
  }, []);
  return (
    <>
      <div className="frame-parent11-nav-bar">
        <div className="frame-wrapper5-nav-bar">
          <div className="frame-parent12-nav-bar" onClick={NavHome}>
            <img className="frame-item-nav-bar" alt="" src="/logitrack-logo.svg" />
            <b className="logitrack-nav-bar">LogiTrack</b>
          </div>
        </div>
        <div className="dashboard-parent-nav-bar">
          <div className="dashboard-nav-bar">Dashboard</div>
          <div className="create-order1-nav-bar"
            onClick={CreateOrderOpen}>
            Create Order
          </div>
        </div>
        <div className="frame-parent13-nav-bar">
          <div className="avatardefault-parent-nav-bar">
            <img
              className="avatardefault-icon-nav-bar"
              alt='profile'
              src={Image}
            />
            <div className="john-doe-nav-bar"><span>{props.name ? props.name : ""}</span></div>
          </div>
          <img
            className="iconarrow-down3-nav-bar"
            alt=""
            src="/arrow-down.svg"
            onClick={openProfile}
          />
        </div>
      </div>

      {isProfileOpen && (
        <PortalPopup
          placement="Top right"
          top={63}
          right={118}
          onOutsideClick={closeProfile}
        >
          <ProfileDetails onClose={closeProfile} />
        </PortalPopup>
      )
      }
      {isCreateOrderOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={CreateOrderClose}
        >
          <CreateOrderForm closecreateorder={CreateOrderClose} setRender={props.setRender} />
        </PortalPopup>
      )
      }
    </>
  );
};

export default Navbar;
