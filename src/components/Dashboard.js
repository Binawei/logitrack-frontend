
import React from 'react'
import EmptyBody from '../components/OderTable';
import Navbar from '../components/Navbar';
import '../css/dashbord.css'
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

function Dashboard() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [render, setRender] = useState(false);

  console.log("i have triggered it " + render);

  const bearerToken = JSON.parse(localStorage.getItem('bearerToken'));

  useEffect(() => {
    if (bearerToken) {
      const decodedToken = jwt_decode(bearerToken);

      if (decodedToken.name) {
        const words = decodedToken.name.split(' ');
        if (words.length > 0) {
          setFirstName(words[0]);
          setLastName(words[1]);
        }
      }
    }
  }, [bearerToken]);

useEffect(() => {
  console.log("i have been triggered");
}, [render])

  const DashboardClick = useCallback(() => {
    navigate("/user-track");
  });
  return (
    <div className='dashfull-db'>
      <Navbar name={firstName + " " + lastName} setRender={setRender} />
      <div className='generalDash-dash'>
        <div className='dashprofile'>
          <h3>Hello, {firstName}</h3>
          <p>Welcome to your Dashboard</p>
        </div>
        <div className='dashboardOrders'>
          <button className='orderbutton'>All Orders</button>
          <button className='trackbutton' onClick={DashboardClick}>Track</button>

        </div>
        <div className='tablerepresent'>
          <EmptyBody />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
