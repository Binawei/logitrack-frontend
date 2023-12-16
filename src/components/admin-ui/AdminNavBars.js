import React from "react";
import "../../css/adminNavbars.css";
import notification from "../../assets/Notificationnoti.png";
import photo from "../../assets/Defaultphoto.png";
import noti from "../../assets/Ellipse 1cir.png";

function AdminNavBars() {
  return (
    <div className="general-navbar-s">
      <div className="content">
        <div className="notification">
          <img src={noti} className="noti-icons" alt="notification" />
          <img
            src={notification}
            className="notitfication-icons"
            alt="notification"
          />
        </div>
        <div className="user-items">
          <img src={photo} className="picture-icon" alt="picture" />
          <p id="picture">John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default AdminNavBars;
