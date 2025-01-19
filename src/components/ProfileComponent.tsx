import React from 'react'
import BottomNav from './BottomNav'
import "./styles/ProfileComponent.css"


function ProfileComponent() {
  return (
    <div className='ProfileComponent' >
        <div>
            <img className='ProfileComponent_Pic' src='https://avatar.iran.liara.run/public/boy?username=Ash'></img>
        </div>
        <div className='ProfileComponent_Username'>Test user</div>

        <div className='ProfileComponent_Logout'>
            <button>Logout</button>
        </div>
      <BottomNav />
    </div>
  )
}

export default ProfileComponent
