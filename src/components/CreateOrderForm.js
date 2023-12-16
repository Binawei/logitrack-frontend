import React, { useCallback, useState, useEffect } from "react";
import "../css/CreateOrderForm.css";
import cancel from "../assets/cancel.svg";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalculatePrice from "./CalculatePrice";
import PortalPopup from "./admin-ui/PortalPopup";
import MakePayment from "./MakePayment";
import styles from "../styles/signUp.module.css";

const CreateOrderForm = (props) => {
  const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));

  const navigate = useNavigate();
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [weight, setWeight] = useState(0);
  const [pickUpTime, setPickUpTime] = useState("");
  const [instructions, setInstructions] = useState("");

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [totalCost, setTotalCost] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const openSuccessModal = useCallback(() => {
    setSuccessModalOpen(true);
  }, []);

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  }

  const openPaymentModal = () => {
    setPaymentOpen(true);
  }

  const closePaymentModal = useCallback(() => {
    setPaymentOpen(false);
  }, []);

  const isEditTrue = () => {
    setIsEdit(true);
  }

  const isEditFalse = useCallback(() => {
    setIsEdit(false);
  }, []);

  const navDashboard = () => {
    navigate("/dashboard");
  }
  const [isFormValid, setFormValid] = useState(false);

  const checkFormValidity = () => {
    const isFieldsFilled =
      pickUpAddress &&
      deliveryAddress &&
      packageDetails &&
      recipientName &&
      recipientPhoneNumber &&
      weight &&
      pickUpTime;

    setFormValid(isFieldsFilled);
  };

  const handleInputChange = (field, data) => {
    updateFormData(field, data);
    checkFormValidity();
  };

  async function getLatLngFromAddress(address) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const responseBody = await response.json();
      console.log("Geocoding API Response Body:", responseBody);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (responseBody.results.length > 0) {
        const location = responseBody.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  }

  const getOrderPrice = async () => {
    try {
      const longValue = parseInt(orderNumber, 10);
      const apiUrl = `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/calculate-order-cost?orderId=${longValue}`;
      const headers = {
        'Authorization': bearerToken,
      };

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem('totalCost', JSON.stringify(result.data));
      closeSuccessModal();
      openPaymentModal();
    } catch (error) {
    }
  }

  const updateFormData = (field, data) => {
    switch (field) {
      case "pickupAddress":
        setPickUpAddress(data);
        break;
      case "deliveryAddress":
        setDeliveryAddress(data);
        break;
      case "packageDetails":
        setPackageDetails(data);
        break;
      case "recipientName":
        setRecipientName(data);
        break;
      case "recipientPhoneNumber":
        setRecipientPhoneNumber(data);
        break;
      case "weight":
        setWeight(data);
        break;
      case "pickUpTime":
        setPickUpTime(data);
        break;
      case "instructions":
        setInstructions(data);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getOrderPrice();
  }, [orderNumber]);

  const handleSubmit = async () => {
    try {
      console.log("getting the address for geocoding.....")
      const pickupLatLng = await getLatLngFromAddress(pickUpAddress);
      const deliveryLatLng = await getLatLngFromAddress(deliveryAddress);
      const pickupLocation = `${pickupLatLng.lat},${pickupLatLng.lng}`;
      console.log(pickupLocation)
      const deliveryLocation = `${deliveryLatLng.lat},${deliveryLatLng.lng}`;
      console.log(deliveryLocation)
      const response = await fetch(
        `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/create-order`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
          },
          body: JSON.stringify({
            pickUpAddress: pickupLocation,
            deliveryAddress: deliveryLocation,
            pickUpAddressTextFormat: pickUpAddress,
            deliveryAddressTextFormat: deliveryAddress,
            packageInfo: packageDetails,
            recipientName,
            recipientNumber: recipientPhoneNumber,
            weight,
            pickUpTime,
            instruction: instructions,
          }),
        }
      );

      
      const responseData = await response.json();
      console.log(responseData)

      if (responseData.code === "00") {
        setOrderNumber(responseData.data.id);
      } else {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/createorder");
        closeSuccessModal();
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      navigate("/createorder");
      closeSuccessModal();
    }
  };

  const EditOrder = async () => {
    try {
      const pickupLatLng = await getLatLngFromAddress(pickUpAddress);
      const deliveryLatLng = await getLatLngFromAddress(deliveryAddress);
      const pickupLocation = `${pickupLatLng.lat},${pickupLatLng.lng}`;
      const deliveryLocation = `${deliveryLatLng.lat},${deliveryLatLng.lng}`;

      const response = await fetch(
        `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/update/${orderNumber}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
          },
          body: JSON.stringify({
            pickUpAddress: pickupLocation,
            deliveryAddress: deliveryLocation,
            pickUpAddressTextFormat: pickUpAddress,
            deliveryAddressTextFormat: deliveryAddress,
            packageInfo: packageDetails,
            recipientName,
            recipientNumber: recipientPhoneNumber,
            weight,
            pickUpTime,
            instruction: instructions,
          }),
        }
      );
      const responseData = await response.json();

      if (responseData.code === "00") {
        closeSuccessModal();
        openPaymentModal();
      } else {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/createorder");
        closeSuccessModal();
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      navigate("/createorder");
      closeSuccessModal();
    }
  };

  return (
    <div className="container-style">
      <form className="form-ord">
        <div className="header-s">
          <div>
            <span className="head-ord">Create Order</span>
          </div>
          <div>
            <img className="success-icon" alt="" src={cancel} onClick={props.closecreateorder} />
          </div>
        </div>
        <div>
          <label htmlFor="pickupAddress">
            Pickup Address:<span className="required">*</span>{" "}
          </label>
          <span className="map-link">
            <span href="#">Use map</span>
          </span>
        </div>
        <input
          className={`${styles.noLeftPadding}`}
          type="text"
          id="pickupAddress"
          name="pickupAddress"
          required
          placeholder="Enter pickup address"
          onChange={(e) => {
            updateFormData("pickupAddress", e.target.value);
            handleInputChange("pickupAddress", e.target.value);
          }}
        />
        <div>
          <label htmlFor="pickupAddress">
            Delivery Address:<span className="required">*</span>{" "}
          </label>
          <span className="map-link">
            <span href="#">Use map</span>
          </span>
        </div>
        <input
          className={`${styles.noLeftPadding}`}
          type="text"
          id="deliveryAddress"
          name="deliveryAddress"
          required
          placeholder="Enter delivery address"
          onChange={(e) => {
            updateFormData("deliveryAddress", e.target.value);
            handleInputChange("deliveryAddress", e.target.value);
          }}
        />
        <label htmlFor="packageDetails">
          Package Details:<span className="required">*</span>{" "}
        </label>
        <input
          className={`${styles.noLeftPadding}`}
          type="text"
          id="packageDetails"
          name="packageDetails"
          required
          placeholder="Enter package details"
          onChange={(e) => {
            updateFormData("packageDetails", e.target.value);
            handleInputChange("packageDetails", e.target.value);
          }}
        />
        <div className="flex-container">
          <div className="flex-item r1-nam">
            <label htmlFor="recipientName">
              Recipient Name:<span className="required">*</span>{" "}
            </label>
            <input
              className={`${styles.noLeftPadding} recipientName`}
              type="text"
              id="recipientName"
              name="recipientName"
              required
              placeholder="Enter recipient name"
              onChange={(e) => {
                updateFormData("recipientName", e.target.value);
                handleInputChange("recipientName", e.target.value);
              }}
            />
          </div>
          <div className="flex-item">
            <label htmlFor="recipientphoneNumber">
              Recipient Number:<span className="required">*</span>{" "}
            </label>
            <input
              className={`${styles.noLeftPadding} recipientphoneNumber`}
              style={{ width: "90%" }}
              type="number"
              id="recipientphoneNumber"
              name="recipientphoneNumber"
              required
              placeholder="Enter recipient phone number"
              onChange={(e) => {
                updateFormData("recipientPhoneNumber", e.target.value);
                handleInputChange("recipientPhoneNumber", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="">
          <div className="flex-item">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              className={`${styles.noLeftPadding}`}
              type="number"
              id="weight"
              name="weight"
              min="0"
              step="0.1"
              onChange={(e) => {
                const formattedWeight = parseFloat(e.target.value).toFixed(2);
                updateFormData("weight", formattedWeight);
                handleInputChange("weight", formattedWeight);
              }}
            />
          </div>
          <div className="flex-item">
            <label htmlFor="pickupTime">
              Pickup Time:<span className="required">*</span>{" "}
            </label>
            <input
              className={`${styles.noLeftPadding}`}
              style={{ width: "486px" }}
              type="date"
              id="pickupTime"
              name="pickupTime"
              required
              placeholder="Choose date"
              onChange={(e) => {
                updateFormData("pickUpTime", e.target.value);
                handleInputChange("pickUpTime", e.target.value);
              }}
            />
          </div>
        </div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={(e) => {
            updateFormData("instructions", e.target.value);
            handleInputChange("instructions", e.target.value);
          }}
          rows="4"
        />
        <div className="submit-div">
          <button
            className="submit"
            type="button"
            onClick={() => {
              openSuccessModal();
              setTimeout(() => {
                if (!isEdit) {
                  handleSubmit();
                }
                else {
                  EditOrder();
                }
              }, 3000);
            }}
            disabled={!isFormValid}
          >
            Send
          </button>
        </div>
      </form>
      {isSuccessModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSuccessModal}
        >
          <CalculatePrice onClose={closeSuccessModal} />
        </PortalPopup>
      )}

      {isPaymentOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePaymentModal}
        >
          <MakePayment onClose={closePaymentModal}
          totalCost={totalCost}
          isedit={isEditTrue} 
          closecreateorder={props.closecreateorder} 
          setRender={props.setRender} 
          closePaymentModal={closePaymentModal} 
          closecalprice = {closeSuccessModal} />
        </PortalPopup>
      )}
    </div>
  );
};

export default CreateOrderForm;

