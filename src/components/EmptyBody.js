import React from 'react'
import Box from '../assets/Emptyboxbox.png'
import '../css/emptyBody.css'

function EmptyBody() {
  return (
    <div className='generalEmpty'>
      <div className='GeneralBox'>
        <img src={Box} alt='Box' className='box'/>
        <div className='middleText'>
            <h1>Oops! No package yet</h1>
            <p>You have not made any package yet</p>
        </div>
        <button className='createButton'><span>Create Order</span></button>
      </div>
    </div>
  )
}

export default EmptyBody
