import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import MAP from '../components/Map';
import '../css/track.css';
import { RxDividerVertical, RxDividerHorizontal } from 'react-icons/rx';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { TbPhonePause } from 'react-icons/tb';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

function Track() {
  const [order, setOrder] = useState(null);
  const [isDeliveredChecked, setIsDeliveredChecked] = useState(false);
  const [isProgressChecked, setIsProgressChecked] = useState(false);
  const [isPickedUpChecked, setIsPickedUpChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function fetchOrderData() {
      const id = location.state && location.state.id;

      if (!id) {
        console.error('No order ID provided.');
        return;
      }

      try {
        const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
        console.log("Bearer token is:", bearerToken);

        const response = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/order/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken,
          }
        });
        console.log(response);

      const responseData = await response.json();
      console.log('JSON Response:', responseData);

      if (responseData.status === "OK") {
        const orderData = responseData.data; 

        const orderStatus = orderData.status;

        if (orderStatus === "IN_PROGRESS") {
          setIsProgressChecked(true);
          setIsPickedUpChecked(true);
        } else if (orderStatus === "PICKED_UP") {
          setIsPickedUpChecked(true);
        } else if (orderStatus === "COMPLETED" || orderStatus === "DELIVERED") {
          setIsDeliveredChecked(true);
        }

        const orderReference = orderData.orderReference;
        const pickUpAddress = orderData.pickUpAddressTextFormat;
        const deliveryAddress = orderData.deliveryAddressTextFormat;
        const recipientName = orderData.recipientName;
        const recipientNumber = orderData.recipientNumber;
        const weight = orderData.weight;
        const status = orderData.status;
        setOrder(orderData)
        console.log('Order Reference:', orderReference);
        console.log('Pickup Address:', pickUpAddress);
        console.log('Delivery Address:', deliveryAddress);
        console.log('Recipient Name:', recipientName);
        console.log('Recipient Number:', recipientNumber);
        console.log('Weight:', weight);
        console.log('Status:', status);
      } else {
        console.error('Failed to fetch order data.');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  
    }

    fetchOrderData();
  }, [location.state]);

 

  const onDashboardClick = useCallback(() => {
    navigate('/dashboard');
  });

  
  const currentLocationRef = useRef(null);
  const otherLocationRef = useRef(null);
  
  function formatDate(pickUpTimeArray) {
    if (!pickUpTimeArray || !Array.isArray(pickUpTimeArray) || pickUpTimeArray.length < 5) {
      return '';
    }
    const date = new Date(
      pickUpTimeArray[0],  
      pickUpTimeArray[1] - 1, 
      pickUpTimeArray[2]  
    );
  
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
  }

  return (
    <div>
      <Navbar />
      <div className="track-container">
        <div className="tracking-button">
          <button className="order-button" onClick={onDashboardClick}>
            All Orders
          </button>
          <button className="track-button">Track</button>
        </div>
        <div className="track-map">
          <div className="track">
            <div className="order-details">
            <p>
    Order ID: <span className="order-id"></span>{order ? order.orderReference : ''}</p>
  <p>
    Recipient: <span className="order-id">{order ? order.recipientName : ''}</span>
  </p>
            </div>
            <RxDividerHorizontal className="dividhorizontal" />
            <div className="arrival">
              <div className="arrival-date">
                <h3>{order ? formatDate(order.pickUpTime) : ''}</h3>
              </div>
              <div className="delivered-general">
                <div className="delivered">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={isDeliveredChecked}
                    />
                    <span className="scheckmark"></span>
                  </label>
                  <RxDividerVertical className="dividline" />
                  <div className="delivered-text">
                    <p>Delivered</p>
                    <p className="delivery-point" ref={currentLocationRef}>{order ? order.pickUpAddressTextFormat : ''}</p>
                  </div>
                </div>
                <div className="delivered-progress">
                  <BsCheckCircleFill
                    className={`progress-icon ${isProgressChecked ? 'checked' : ''}`}
                  />
                  <p>In progress</p>
                </div>
                <div className="delivered-pickup">
                  <BsCheckCircleFill
                    className={`pickup-icon ${isPickedUpChecked ? 'checked' : ''}`}
                    
                  />
                  <p>Picked-up</p>
                </div>
              </div>
            </div>
            <RxDividerHorizontal className="dividhorizontal" />
            <div className="delivery">
              <div className="pickup-address">
                <h3>Delivery Address</h3>
              </div>
              <div className="delivery-address-main">
                <span>
                  <MdLocationPin className="location-icon" />
                  <span className="location-name" ref={otherLocationRef}>
                  {order ? order.deliveryAddressTextFormat : ''}
                  </span>
                </span>
                <p className="phone-number">
                  <TbPhonePause className="phone-icon" />{' '}
                  {order ? order.recipientNumber :''}
                </p>
              </div>
            </div>
          </div>
          <div className="map-container">
            <MAP currentLocationRef={currentLocationRef} otherLocationRef={otherLocationRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
