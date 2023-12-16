import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/ProfileDetails.css";

const ProfileDetails = (props) => {

    const navigate = useNavigate();

    const [data, setData] = useState("");

    const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));

    const Logout = async () => {
        try {
          const logoutRequest = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: bearerToken,
            },
          });
    
          const verifyData = await logoutRequest.json();
    
          if (verifyData.code === "00") {
            toast.success(verifyData.data, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                onClose: () => {
                    navigate("/login");
                },
              });
          } else {
            toast.error(verifyData.data, {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetail = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/auth/userdetails`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: bearerToken,
                    },
                });

                const verifyData = await userDetail.json();

                if (verifyData.code === "00") {
                    setData(verifyData.data);
                } else {
                    toast.error(verifyData.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [bearerToken]);

    return (
            <div className="profile-details-lg">
                <div className="profile-details-inner-lg">
                    <div className="frame-parent-lg">
                        <div className="user-profile-parent-lg">
                            <div className="user-profile-lg"></div>
                            <img
                                className="iconclear-lg"
                                alt=""
                                src="/cancel.svg"
                                onClick={props.onClose}
                            />
                        </div>
                        <img className="divider-icon-lg" alt="" src="/divider.svg" />
                    </div>
                </div>
                <img className="divider-icon1-lg" alt="" src="/lg-divider.svg" />
                <div className="frame-group-lg">
                    <div className="avatardefault-parent-lg">
                        <img
                            className="avatardefault-icon-lg"
                            alt=""
                            src="/avatar-gen.png"
                        />
                        <div className="text-parent-lg">
                            <div className="text-lg">{data.fullName}</div>
                            <div className="dispatch-rider-lg">{data.role}</div>
                            <div className="dispatch-rider-lg">{data.email}</div>
                        </div>
                    </div>
                    <div className="edit-photo-lg" onClick={Logout}>
                        logout
                    </div>
                </div>
        </div>
    );
};

export default ProfileDetails;
