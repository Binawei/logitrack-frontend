import React from 'react'
import { useState, useEffect, useRef} from 'react'
import AdminNavBars from './AdminNavBars'
import AdminSideBars from './AdminSideBars'
import MAP from '../../components/Map'
import '../../css/track.css'
import '../../css/admin-map.css'
import {RxDividerVertical, RxDividerHorizontal} from 'react-icons/rx'
import {BsCheckCircleFill} from 'react-icons/bs'
import {MdLocationPin} from 'react-icons/md'
import {TbPhonePause} from 'react-icons/tb'
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


function AdminTracking() {
  const navigate = useNavigate();

    const onDashboardClick = useCallback(() => {
        navigate("/admin-track");
      });

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const currentLocationRef = useRef(null);
    const otherLocationRef = useRef(null);

    useEffect(() => {
        const currentLocationText = currentLocationRef.current.textContent;
        const otherLocationText = otherLocationRef.current.textContent;
    
        console.log('Current Location Text:', currentLocationText);
        console.log('Other Location Text:', otherLocationText);
      }, []);

  return (
    <div className='general-track'>
        <AdminSideBars/> 
        <div className='nav-bodies'>
        <div className='navbar-ooss'>
             <AdminNavBars/></div> 
    <div className='trackss-container'>
        <div className='track-container'>
        <p id='trackS-text'>Tracking</p>
            <div className='trsack'>
                <button className='order-button' onClick={onDashboardClick}>All</button>
                <button className='track-button'>Active Orders</button>
            </div>
            <div className='track-map'>
                <div className='track'>
                    <div className='order-details'>
                        <p>Order ID: <span className='order-id'>EN543489</span></p>
                        <p>Rider Name:   <span className='order-id'>Emeka Obi</span></p>
                        <p>Weight: <span className='order-id'>20kg</span></p>
                        <p>Motorcycle Number: <span className='order-id'>LAG 135-689</span></p>
                        <p>Total Amount:  <span className='order-id'>N10,000</span></p>
                        <p>Status:  <span id='STATUSS'>On the way</span></p>
                    </div>
                    <RxDividerHorizontal className='dividhorizontal' />
                    <div className='arrival'>
                        <div className='arrival-date'>
                            <h3>Arriving July 27/7/2023</h3>
                        </div>
                        <div className='delivered-general'>
                            <div className='delivered'>
                                <div className='divider'>
                                        <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isChecked} onChange={() => { setIsChecked(!isChecked); }}
                                    />
                                    <span className="scheckmark"></span>
                                </label>
                                <RxDividerVertical className='dividline' />
                                </div>
                                <div className='delivered-text'>
                                    <p>Delivered</p>
                                    <p className='delivery-point' ref={currentLocationRef}> Enagwe campus(home of Edo Tech Park), Ohen Road, Main Road, off, Benin City, NG</p>
                                </div>
                            </div>
                            <div className='delivered-progress'>
                                <BsCheckCircleFill className={`progress-icon ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxClick}/>
                                <p>In progress</p>
                            </div>
                            <div className='delivered-pickup'>
                                <BsCheckCircleFill className={`pickup-icon ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxClick}/>
                                <p>Picked-up</p>
                            </div>
                        </div>
                    </div>
                    <RxDividerHorizontal className='dividhorizontal' />
                    <div className='delivery'>
                        <div className='pickup-address'>
                            <p>pickup Address</p>
                        </div>
                        <div className='delivery-address-main'>
                        <p className='location-name' ref={otherLocationRef}><MdLocationPin className='location-icon'/>no 20a gmo road head bridge, onitsha, anambra state, nigeria</p>
                           <p className='phone-number'> <TbPhonePause className='phone-icon'/>07078909876</p>
                        </div>

                    </div>
                </div>
                <div className='map-container'>
                <MAP
              currentLocationRef={currentLocationRef}
              otherLocationRef={otherLocationRef}
            />

                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default AdminTracking
