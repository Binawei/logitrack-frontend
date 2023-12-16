import Divider from "./Divider";
import PortalPopup from "./PortalPopup";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

const AdminSideBar = () => {

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  const onFeature2ContainerClick = useCallback(() => {
    navigate("/admin-dashboard");
  }, []);
    const onFeature22ContainerClick = useCallback(() => {
    navigate("/admin-dashboard/allcustomers/");
  }, []);
  const onFeature3ContainerClick = useCallback(() => {
    // Please sync "TRACKING" to the project
  }, []);

  const onFeature6ContainerClick = useCallback(() => {
    navigate("/admin-dashboard/admin-all-orders");
  }, []);

  const onFeature5ContainerClick = useCallback(() => {
    // Please sync "PAYMENT" to the project
  }, []);

  const openSuccessModal = useCallback(() => {
    setSuccessModalOpen(true);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);
  const NavHome = useCallback(() => {
    navigate("/");
  });

    return (
        <>
 <div className="dashboardside-bardefault">
          <div className="frame-parent40">
            <div className="frame-parent50">
              <img className="frame-iconav" alt="" src="/frame-38813362.svg" />
              <b className="logictrack" onClick={NavHome}>LogiTrack</b>
            </div>
            <Divider
              dividerDivider="/divider.svg"
              dividerIconMaxHeight="unset"
              dividerIconWidth="223px"
              dividerIconPosition="relative"
              dividerIconHeight="1px"
            />
          </div>
          <div className="frame-parent16"> 
           <div className="overview-group">
              <div className="overview-container">Overview</div>
              <div className="feature-1-parent">
                <div className="feature-1" onClick={onFeature2ContainerClick}>
                  <img
                    className="vuesaxbulkcategory-icon"
                    alt=""
                    src="/category.svg"
                  />
                  <div className="total-revenue">Dashboard</div>
                </div>
                <div className="feature-2" onClick={onFeature22ContainerClick}>
                  <img
                    className="vuesaxbulkcategory-icon"
                    alt=""
                    src="/people.svg"
                  />
                  <div className="overview-container">Users</div>
                </div>
                <div className="feature-3" onClick={onFeature3ContainerClick}>
                  <img
                    className="iconarrow-down"
                    alt=""
                    src="/my-location.svg"
                  />
                  <div className="overview-container">Tracking</div>
                </div>
                <div className="feature-6" onClick={onFeature6ContainerClick}>
                  <img
                    className="iconarrow-down"
                    alt=""
                    src="/group.svg"
                  />
                  <div className="overview-container">Orders</div>
                </div>
                <div className="feature-4">
                  <img
                    className="iconarrow-down"
                    alt=""
                    src="/assignment-ind.svg"
                  />
                  <div className="overview-container">Assign Order</div>
                </div>
                <div className="feature-3" onClick={onFeature5ContainerClick}>
                  <img className="iconarrow-down" alt="" src="/payments.svg" />
                  <div className="overview-container">Manage Payment</div>
                </div>
              </div>
            </div> 
            <div className="overview-group">
              <div className="overview-container">Others</div>
              <div className="feature-1-parent">
                <div className="feature-41">
                  <img className="iconarrow-down" alt="" src="/groupss.svg" />
                  <div className="overview-container">Settings</div>
                </div>
                <div className="feature-2" onClick={openSuccessModal}>
                  <img className="iconarrow-down" alt="" src="/logout.svg" />
                  <div className="overview-container">Logout</div>
                </div>
              </div>
            </div> 
         </div>
       </div>
       {
        isSuccessModalOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeSuccessModal}
          >
            <SuccessModal onClose={closeSuccessModal} />
          </PortalPopup>
        )
      }
       </>
  );
};

export default AdminSideBar;