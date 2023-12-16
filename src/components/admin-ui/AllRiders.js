
import React from 'react'
import AllRidersTable from './AllRidersTable';
import './AllRiders.css'
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";

function AllRiders() {

  const navigate = useNavigate();

  const onCustomerClick = useCallback(() => {
    navigate("/admin-dashboard/allcustomers");
  });
  const onNewRider = useCallback(() => {
    navigate("/admin-dashboard/create-rider");
  });

  return (
    <div className='ridersfull'>  
       <div className='generalDash'>
        <div className='allUserRider'>
            <h3>All Users</h3>
            <button className='newRiderbutton' onClick={onNewRider}>New Rider</button>
        </div>
        <div className='riders'>
            <button className='orderbutton'>Riders</button>
            <button className='trackbutton' onClick={onCustomerClick}>Customers</button>
        </div>
        <div className='tablerepresent'>
        <AllRidersTable/>
        </div>

       </div>

     
    </div>
  )
}

export default AllRiders
