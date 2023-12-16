import React from 'react'
import './RiderProfileModal.css'
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { BiCollapseHorizontal } from 'react-icons/bi';
import Divider from './Divider';

function RiderProfileModal() {
  const navigate = useNavigate();

  const onTrackClick = useCallback(() => {
    navigate("/user-track");
  });
  return (
    <div className='profilemodal'>
      <div>
        <h2 className='userprofile.rider'> User Profile</h2>
        <BiCollapseHorizontal />
      </div>
      < Divider />
      <div className='leftMost'>
        <div className='imageclass'>
          <img src={Image} alt='profile' className='profileImage' />
          <p>John Doe</p>
        </div>

        <h4> Emeka Obi</h4> {'\n'}
        <p> Dispatch Rider </p> {'\n'}
        <p> emekaobi@gmail.com</p>
      </div>
      <div className='rightMost'>
        <a href='#'> <p className='editphoto'> Edit Photo</p> </a>
      </div>
      < Divider />




    </div>
  )
}

export default RiderProfileModal
