import React from 'react'
import { BsCircleFill } from 'react-icons/bs'
import {TbBus} from 'react-icons/tb'
import '../css/fulldash.css';
import '../css/navbar.css'
import Image from '../assets/Defaultprofile.jpg'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function NavBarDash() {
  const navigate = useNavigate();
  const onCreateOrderClick = useCallback(() => {
    navigate("/createorder");
  });
  return (
    <div className='navbarGeneral'>
      <div className='text2'>
                    <BsCircleFill className='circles-icon' />
                    <TbBus className='buss-icon'/> <p>LogiTrack</p>
        </div>
        <ul className='listeddivcc'>
            <li>Dashboard </li>
            <li onClick={onCreateOrderClick}>Create Order</li>
        </ul>
        <div className='leftMost'>
            <div className='imageclass'>
                <img src={Image} alt='profile' className='profileImage'/>
                <p>John Doe</p>
            </div>
            <RiArrowDropDownLine className='drop-icon'/>
        </div>
    </div>
  )
}

export default NavBarDash
