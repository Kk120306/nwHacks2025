import React, { useState } from 'react'
import "./styles/HomeScreen.css"
import MapComponent from './MapComponent';
import ListComponent from '../ListComponent';
import MessagesComponent from './MessagesComponent';

function HomeScreen() {
  const [activeScreen, setActiveScreen] = useState("Map")

  return (
    <div className='HomeScreen' >
      {activeScreen == "Map" ? <MapComponent /> : activeScreen == "List" ? <ListComponent /> : <MessagesComponent />}
      <div className='HomeScreen_TopBar'>
        <div className='HomeScreen_TopBar_Logo'>LOGO</div>
        <button className='HomeScreen_TopBar_Profile'>PROFILE</button>
      </div>
      <div className='HomeScreen_BottomBar'>
        <button className='HomeScreen_BottomBar_Messages' onClick={() => {setActiveScreen("List")}} >L</button>
        <button className='HomeScreen_BottomBar_Home' onClick={() => {setActiveScreen("Map")}}>M</button>
        <button className='HomeScreen_BottomBar_List'>M</button>
      </div>
    </div>
  )
}

export default HomeScreen
