import styles from "../../styles/signUp.module.css";
import React from "react";
import { useEffect, useState } from "react";
import "./createRider.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRider = () => {
  const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
  const navigate = useNavigate();

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [driversLicenseNumber, setDriversLicenseNumber] = useState("");
  const [stateOfIssue, setStateOfIssues] = useState("");

  const [isFormValid, setFormValid] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const checkFormValidity = () => {
    const isFieldsFilled =
      fullName &&
      email &&
      phoneNumber &&
      password &&
      gender &&
      address &&
      dateOfBirth &&
      state &&
      city &&
      driversLicenseNumber &&
      stateOfIssue;

    setFormValid(isFieldsFilled);
  };

  const handleInputChange = (field, data) => {
    updateFormData(field, data);
    checkFormValidity();
  };
  const updateFormData = (field, data) => {
    switch (field) {
      case "fullName":
        setfullName(data);
        break;
      case "email":
        setEmail(data);
        break;
      case "phoneNumber":
        setPhoneNumber(data);
        break;
      case "password":
        setPassword(data);
        break;
      case "gender":
        setGender(data);
        break;
      case "address":
        setAddress(data);
        break;
      case "dateOfBirth":
        setDateOfBirth(data);
        break;
      case "state":
        setState(data);
        break;
      case "city":
        setCity(data);
        break;
      case "driverLicenseNumber":
        setDriversLicenseNumber(data);
        break;
      case "stateOfIssue":
        setStateOfIssues(data);
        break;
      default:
        break;
    }
  };
  console.log({
    fullname: fullName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
    gender: gender,
    address: address,
    dateOfBirth: dateOfBirth,
    state: state,
    city: city,
    driversLicenseNumber: driversLicenseNumber,
    stateOfIssue: stateOfIssue,
  });

  const ResetForm = () => {
    setfullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setGender("");
    setAddress("");
    setDateOfBirth("");
    setState("");
    setCity("");
    setDriversLicenseNumber("");
    setStateOfIssues("");
    setFormValid(false);
  };


  const HandleSubmit = async (e) => {

    try {
      console.log(bearerToken);
      const requestConfig = {
        url: `${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/create-delivery-man`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${bearerToken}`,
        },
        data: {
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          gender: gender,
          address: address,
          dateOfBirth: dateOfBirth,
          state: state,
          city: city,
          driversLicenseNumber: driversLicenseNumber,
          stateOfIssue: stateOfIssue,
        },
      };

      const response = await axios(requestConfig);
      console.log(response.data);
      setIsDone(response);
      { isDone && ResetForm() }
      if (response.data.code === "00") {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/admin-dashboard/allriders");
        }, 2000);
        

      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="adminform-container">
        <div className="header-rider-s">
          <div>
            <span className="head">Create Rider Account</span>
          </div>
        </div>
        <div className="formcontainer">
          <form className="form" >
            <div className="row">
              <div className="col half">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Enter your Full Name"
                  onChange={(e) => {
                    updateFormData("fullName", e.target.value);
                    handleInputChange("fullName", e.target.value);
                  }}
                />
              </div>
              <div className="col half">
                <label htmlFor="email">Email</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    updateFormData("email", e.target.value);
                    handleInputChange("email", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  placeholder="Enter Phone Number"
                  onChange={(e) => {
                    updateFormData("phoneNumber", e.target.value);
                    handleInputChange("phoneNumber", e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="gender">Gender</label>
                <select
                  style={{
                    border: '1px solid var(--Grey-400, #98a2b3)',
                  }}
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    updateFormData("gender", e.target.value);
                    handleInputChange("gender", e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div className="col">
                <label htmlFor="password">Password</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                  onChange={(e) => {
                    updateFormData("password", e.target.value);
                    handleInputChange("password", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col half">
                <label htmlFor="address">Address</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '2px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="text"
                  id="address"
                  name="address"
                  required
                  placeholder="Enter Address"
                  onChange={(e) => {
                    updateFormData("address", e.target.value);
                    handleInputChange("address", e.target.value);
                  }}
                />
              </div>
              <div className="col half">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  placeholder="Enter Date Of Birth"
                  onChange={(e) => {
                    updateFormData("dateOfBirth", e.target.value);
                    handleInputChange("dateOfBirth", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col half">
                <label htmlFor="state">State</label>
                <select
                  style={{
                    border: '1px solid var(--Grey-400, #98a2b3)',
                  }}
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => {
                    updateFormData("state", e.target.value);
                    handleInputChange("state", e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwaibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nassarawa">Nassarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                  <option value="Federal Capital Territory">
                    Federal Capital Territory
                  </option>
                </select>
              </div>
              <div className="col half">
                <label htmlFor="city">City</label>
                <input
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  id="city"
                  name="city"
                  onChange={(e) => {
                    updateFormData("city", e.target.value);
                    handleInputChange("city", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col half">
                <label htmlFor="driverLicenseNumber">
                  Driver License Number
                </label>
                <input
                  className={`${styles.noLeftPadding}`}
                  style={{
                    '&:focus': {
                      border: '1px solid var(--Grey-400, #98a2b3)',
                    }
                  }}
                  type="text"
                  id="driverLicenseNumber"
                  name="driverLicenseNumber"
                  required
                  placeholder="Enter driver license number here"
                  onChange={(e) => {
                    updateFormData("driverLicenseNumber", e.target.value);
                    handleInputChange("driverLicenseNumber", e.target.value);
                  }}
                />
              </div>
              <div className="col half">
                <label htmlFor="stateOfIssue">State of Issue</label>
                <select
                  style={{
                    border: '1px solid var(--Grey-400, #98a2b3)',
                  }}
                  id="state"
                  name="state"
                  onChange={(e) => {
                    updateFormData("stateOfIssue", e.target.value);
                    handleInputChange("stateOfIssue", e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwaibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nassarawa">Nassarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                  <option value="Federal Capital Territory">
                    Federal Capital Territory
                  </option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col full">
                <button type="button" className="stylebtn" onClick={HandleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRider;
