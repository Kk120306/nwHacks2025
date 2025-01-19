import React, { useState } from 'react'
import "./styles/HomeScreen.css"
import MapComponent from './MapComponent';
import ListComponent from './ListComponent';
import MessagesComponent from './MessagesComponent';
import AddComponent from './AddComponent';

function HomeScreen({activeScreen}) {
  return (
    <div className='HomeScreen' >
      {activeScreen == "Map" ? <MapComponent /> : 
      activeScreen == "List" ? <ListComponent /> : 
      activeScreen == "Add" ? <AddComponent /> : 
      <MessagesComponent />}
      <div className='HomeScreen_TopBar'>
        <div className='HomeScreen_TopBar_Logo'> 
          {activeScreen == "Map" ? <div>LOGO</div> : 
          activeScreen == "List" ? <div>Caches near you</div> : 
          activeScreen == "Add" ? <div>Add a cache</div> : 
          <MessagesComponent />}
        </div>
      </div>
      {/* <div className='HomeScreen_BottomBar'>
        <button className='HomeScreen_BottomBar_Messages' onClick={() => {setActiveScreen("List")}} >L</button>
        <button className='HomeScreen_BottomBar_Home' onClick={() => {setActiveScreen("Map")}}>M</button>
        <button className='HomeScreen_BottomBar_List'>Me</button>
      </div> */}
    </div>
  )
}

export default HomeScreen
