import { useMemo, useEffect, useState } from "react";
import "./NavBarDefaultType.css";
import jwt_decode from 'jwt-decode';

const NavBarDefaultType = ({
  searchAlt = "/searchalt.svg",
  frame38813517 = "/notification.svg",
  avatarDefault = "/adminprofile.png",
  fisearch = "/fisearch.svg",
  showFrameDiv = false,
  navBarDefaultTypePosition = "fixed",
  navBarDefaultTypeTop = "0px",
  navBarDefaultTypeLeft = "271px",
}) => {
  const navBarDefaultTypeStyle = useMemo(() => {
    return {
      position: navBarDefaultTypePosition,
      top: navBarDefaultTypeTop,
      left: navBarDefaultTypeLeft,
    };
  }, [navBarDefaultTypePosition, navBarDefaultTypeTop, navBarDefaultTypeLeft]);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const bearerToken = JSON.parse(localStorage.getItem('bearerToken'));

  useEffect(() => {
    if (bearerToken) {
      const decodedToken = jwt_decode(bearerToken);

      if (decodedToken.name) {
        const words = decodedToken.name.split(' ');
        if (words.length > 0) {
          setFirstName(words[0]);
          setLastName(words[1]);
        }
      }
    }
  }, [bearerToken]);

  return (
    <div className="navbardefault-type" style={navBarDefaultTypeStyle}>
      <div className="navbardefault-type-child" />
      <div className="search-bar">
        <div className="search-alt-parent">
          <img className="search-alt-icon" alt="" src={searchAlt} />
          <div className="search">Search</div>
        </div>
      </div>
      <div className="frame-parent70">
        <img className="frame-child2" alt="" src={frame38813517} />
        <div className="search-alt-parent">
          <img className="avatardefault-icon" alt="" src={avatarDefault} />
          <div className="search">{firstName + " " + lastName}</div>
        </div>
      </div>
      {showFrameDiv && (
        <div className="frame-parent80">
          <div className="fisearch-wrapper">
            <img className="search-alt-icon" alt="" src={fisearch} />
          </div>
          <div className="search">Search</div>
        </div>
      )}
    </div>
  );
};

export default NavBarDefaultType;
