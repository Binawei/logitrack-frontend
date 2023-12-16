
import React from 'react'
import AllCustomerTable from './AllCustomerTable';
import './AllCustomer.css'
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import AdminSideBar from './AdminSideBar';

function AllCustomer() {

    const navigate = useNavigate();

    //   const [firstName, setFirstName] = useState('');
    //   useEffect(() => {
    //     const userData = JSON.parse(localStorage.getItem('userData'));
    //     if (userData && userData.firstName) {
    //       setFirstName(userData.firstName);
    //     }
    //   }, []);

    const onRidersClick = useCallback(() => {
        navigate("/admin-dashboard/allriders");
    });
    return (
        <div className='dashfull'>
    
            <div className='generalDash'>
                <div className='dashprofile'>
                    <h3>All Users</h3>
                </div>
                <div className='customers-ac'>
                    <button className='orderbutton'>Customers</button>
                    <button className='trackbutton' onClick={onRidersClick}>Riders</button>
                </div>
                <div className='tablerepresentcustomer'>
                    <AllCustomerTable />
                </div>

            </div>
        </div>
    )
}

export default AllCustomer
