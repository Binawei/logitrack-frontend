import TexttrueStateDefaultChec from "../components/TexttrueStateDefaultChec";
import OnHoldCard from "../components/OnHoldCard";
import RiderDivider from "../components/RiderDivider";
import NavBarDefaultType from "../../admin-ui/NavBarDefaultType";
import "../style/ASSIGNEDTICKET.css";
import PortalPopup from "./PortalPopup";
import SuccessModal from "../../admin-ui/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

const ASSIGNEDTICKET = () => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

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
    <div className="assigned-ticket">
      <div className="assigned-order-parent">
        <b className="assigned-order">Assigned Order</b>
        <div className="filter-parent">
          <div className="filter">Filter</div>
          <img
            className="filter-list-alt-icon"
            alt=""
            src="/filter_list_alt.svg"
          />
        </div>
      </div>
      <div className="frame-parent-rider">
        <div className="selectioncheckbox-parent">
          <TexttrueStateDefaultChec
            checkboxBase="/checkbox-base.svg"
            showText={false}
            texttrueStateDefaultChecPosition="unset"
            texttrueStateDefaultChecTop="unset"
            texttrueStateDefaultChecLeft="unset"
          />
          <div className="order-id-rd">ORDER ID</div>
          <div className="order-id-rd">CUSTOMER ID</div>
          <div className="order-id-rd">ASSIGN TO</div>
          <div className="order-id-rd">STATUS</div>
          <div className="order-id-rd">ORDER CREATED</div>
          <div className="order-id-rd">LAST UPDATED</div>
        </div>
        <OnHoldCard />
      </div>
      <div className="assign-oderside-bardefault">
        <div className="frame-group-rd">
          <div className="frame-container-rd">
            <img className="frame-child-rd" alt="" src="/frame-38813362.svg" />
            <b className="logictrack-rd" onClick={NavHome}>LogiTrack</b>
          </div>
          <RiderDivider
            dividerDivider="/divider.svg"
            dividerIconMaxHeight="unset"
            dividerIconWidth="223px"
            dividerIconPosition="relative"
            dividerIconHeight="1px"
          />
        </div>
        <div className="frame-div-rd">
          <div className="overview-parent-rd">
            <div className="filter">Overview</div>
            <div className="feature-1-parent-rd">
              <div className="feature-1-rd">
                <img
                  className="vuesaxbulkcategory-icon"
                  alt=""
                  src="/clr-category.svg"
                />
                <div className="filter">Dashboard</div>
              </div>
              <div className="feature-2-rd">
                <img
                  className="vuesaxbulkcategory-icon"
                  alt=""
                  src="/people.svg"
                />
                <div className="filter">Users</div>
              </div>
              <div className="feature-3-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/my-location.svg"
                />
                <div className="filter">Tracking</div>
              </div>
              <div className="feature-1-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/orders.svg"
                />
                <div className="filter">Orders</div>
              </div>
              <div className="feature-4-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/assignment_ind.svg"
                />
                <div className="assign-order">Assign Order</div>
              </div>
              <div className="feature-3-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/payments.svg"
                />
                <div className="filter">Manage Payment</div>
              </div>
            </div>
          </div>
          <div className="overview-parent-rd">
            <div className="filter">Others</div>
            <div className="feature-1-parent-rd">
              <div className="feature-2-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/settings.svg"
                />
                <div className="filter">Settings</div>
              </div>
              <div className="feature-2-rd">
                <img
                  className="filter-list-alt-icon"
                  alt=""
                  src="/logout.svg"
                />
                <div className="filter" onClick={openSuccessModal}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBarDefaultType
          searchAlt="/searchalt.svg"
          frame38813517="/notification.svg"
          avatarDefault="/adminprofile.png"
          fisearch="/fisearch.svg"
          showFrameDiv={false}
          navBarDefaultTypePosition="absolute"
          navBarDefaultTypeTop="0px"
          navBarDefaultTypeLeft="271px"
        />
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
    </div>
  );
};

export default ASSIGNEDTICKET;
