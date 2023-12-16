import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SuccessModal.css";

const SuccessModal = (props) => {
  const navigate = useNavigate();

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

  return (
    <div className="success-modal">
      <div className="are-you-sure-you-want-to-logou-wrapper">
        <b className="are-you-sure-container">
          <p className="are-you-sure">Are you sure you want</p>
          <p className="are-you-sure">to logout?</p>
        </b>
      </div>
      <div className="primary-button-parent">
        <div className="primary-button" onClick={Logout}>
          <div className="loginad">Yes, Log me out</div>
        </div>
        <div
          className="primary-button1"
          onClick={props.onClose}
        >
          <div className="login1" >No</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
