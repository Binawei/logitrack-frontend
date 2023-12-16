import React from 'react'
import '../../css/adminSidebar.css'
import { BsCircleFill } from 'react-icons/bs'
import {TbBus} from 'react-icons/tb'
import {GoHorizontalRule} from 'react-icons/go'
import dash from '../../assets/category.png'
import people from '../../assets/peoplepeople.png'
import shopping from '../../assets/shopping_bag.png'
import settings from '../../assets/settings.png'
import logouts from '../../assets/logout.png'

function AdminSideBars() {
  return (
    <div className='general-sidebar'>
        <div className='top-side'>
            <div className='textxx'>
                            <BsCircleFill className='circles-iconxx' />
                            <TbBus className='buss-iconxx'/> <p>LogiTrack</p>
                </div>
                <GoHorizontalRule className='horizontals-line'/>
        </div>
        <div className='overview-sideber'>
            <p id='over'>Overview</p>
            <div className='dashboard-list'>
                <div className='list-sidebar'>
                    <img src={dash} className='icons' alt='dashboard' />
                    <p id='texts'>Dashboard</p>
                </div>
                <div className='list-sidebar'>
                    <img src={people} className='people-icons' alt='users' />
                    <p id='texts'>Users</p>
                </div>
                <div className='list-sidebar'>
                    <img src={shopping} className='people-icons' alt='shopping' />
                    <p id='texts'>Orders</p>
                </div>
            </div>
        </div>
        <div className='others-view'>
        <p id='others'>Others</p>
            <div className='others-list'>
            <div className='list-sidebar'>
                    <img src={settings} className='people-icons' alt='shopping' />
                    <p id='texts'>Settings</p>
                </div>
                <div className='list-sidebar'>
                    <img src={logouts} className='people-icons' alt='shopping' />
                    <p id='texts'>Logout</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBars
