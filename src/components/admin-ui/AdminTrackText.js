import React from 'react'
import {MdFilterAlt} from 'react-icons/md'
import {GoHorizontalRule} from 'react-icons/go'
import '../../css/adminTrack.css';
import AdminSideBars from './AdminSideBars';
import AdminNavBars from './AdminNavBars';
import TrackOptions from './TrackOptions';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


function AdminTrackText() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
   const navigate = useNavigate();

  const onActiveOrdersClick = useCallback(() => {
    navigate("/admin-track-active");
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className='top-div'> 
    <AdminSideBars/> 
    <div className='navbar-body'>
      <div className='navbar-oo'>
    <AdminNavBars/></div> 
    <div className='general-admin-track'>
     <div className='admin-track'>
      <div className='filter'>
        <p>Tracking</p>
        <div className='filter-ic' onClick={toggleDropdown}>
            <p>Filter</p>
            <MdFilterAlt className='filter-icon'/>
            {isDropdownOpen && <TrackOptions />} 
        </div>
      </div>
      <div className='buttondiv'>
        <button className='active-order' onClick={onActiveOrdersClick}>Active Order</button>
        <button className='all'>All</button>
      </div>
      <div className='general-text'>
        <div className='first-text'>
            <div className='top-order-number'> 
                <div className='order-number'>
                    <p>Order Number: <span>EN543489</span></p>
                    <p>Weight: <span>20kg</span></p>
                </div>
                <div className='rider-order'>
                    <p>Placed on: <span>July 2, 2023</span></p>
                    <p>Rider’s ID: <span>EN89473728</span></p>
                </div>
                <div className='delivered-on'>
                <p>Delivered on: <span>July 7, 2023</span></p>
                    <p>Total Amount Paid: <span>N4,500</span></p>
                </div>
            </div>
            <GoHorizontalRule className='horizontal-line'/>
            <div className='middle-order'>
                <div className='delivery-a'>
                  <p> Delivery Address:</p>
                  <p>3, Stanley Olajide street, Ikosi-Ketu, LAgos</p>
                </div>
                <div className='delivery-a'>
                  <p> Payment Method:</p>
                  <p>Paystack</p>
                </div>
                <div className='delivery-a'>
                  <p> Status</p>
                  <p id='status'>Delivered</p>
                </div>
            </div>
            <button id='download'>Download PDF</button>
        </div>
        <div className='first-text'>
            <div className='top-order-number'> 
                <div className='order-number'>
                    <p>Order Number: <span>EN543489</span></p>
                    <p>Weight: <span>20kg</span></p>
                </div>
                <div className='rider-order'>
                    <p>Placed on: <span>July 2, 2023</span></p>
                    <p>Rider’s ID: <span>EN89473728</span></p>
                </div>
                <div className='delivered-on'>
                <p>Delivered on: <span>July 7, 2023</span></p>
                    <p>Total Amount Paid: <span>N4,500</span></p>
                </div>
            </div>
            <GoHorizontalRule className='horizontal-line'/>
            <div className='middle-order'>
                <div className='delivery-a'>
                  <p> Delivery Address:</p>
                  <p>3, Stanley Olajide street, Ikosi-Ketu, LAgos</p>
                </div>
                <div className='delivery-a'>
                  <p> Payment Method:</p>
                  <p>Paystack</p>
                </div>
                <div className='delivery-a'>
                  <p> Status</p>
                  <p id='status'>Delivered</p>
                </div>
            </div>
            <button id='download'>Download PDF</button>
        </div>
        <div className='first-text'>
            <div className='top-order-number'> 
                <div className='order-number'>
                    <p>Order Number: <span>EN543489</span></p>
                    <p>Weight: <span>20kg</span></p>
                </div>
                <div className='rider-order'>
                    <p>Placed on: <span>July 2, 2023</span></p>
                    <p>Rider’s ID: <span>EN89473728</span></p>
                </div>
                <div className='delivered-on'>
                <p>Delivered on: <span>July 7, 2023</span></p>
                    <p>Total Amount Paid: <span>N4,500</span></p>
                </div>
            </div>
            <GoHorizontalRule className='horizontal-line'/>
            <div className='middle-order'>
                <div className='delivery-a'>
                  <p> Delivery Address:</p>
                  <p>3, Stanley Olajide street, Ikosi-Ketu, LAgos</p>
                </div>
                <div className='delivery-a'>
                  <p> Payment Method:</p>
                  <p>Paystack</p>
                </div>
                <div className='delivery-a'>
                  <p> Status</p>
                  <p id='status'>Delivered</p>
                </div>
            </div>
            <button id='download'>Download PDF</button>
        </div>
      </div>
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default AdminTrackText
