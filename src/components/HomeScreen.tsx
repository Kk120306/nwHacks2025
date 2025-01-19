import React, { useState } from 'react';
import './styles/HomeScreen.css';
import MapComponent from './MapComponent';
import ListComponent from './ListComponent';
import MessagesComponent from './MessagesComponent';
import AddComponent from './AddComponent';

function HomeScreen({ activeScreen }) {
  return (
    <div className='HomeScreen'>
      {activeScreen === "Map" ? <MapComponent /> : 
        activeScreen === "List" ? <ListComponent /> : 
        activeScreen === "Add" ? <AddComponent /> : 
        <MessagesComponent />}

      <div className='HomeScreen_TopBar'>
        <div className='HomeScreen_TopBar_Logo'>
          {activeScreen === "Map" || "List" || "Add" ? <img src="/logo.png" alt="Logo" id="logo" /> : 
          <MessagesComponent />}
        </div>
        
        {/* Name in the center of the top bar */}
        <div className="HomeScreen_TopBar_Center">
          <span className="product-name">GeoCache</span>
        </div>

        {/* Avatar on the top right */}
        <div className="HomeScreen_TopBar_Avatar">
          <img src="/man.png" alt="User Avatar" className="avatar" />
        </div>
      </div>

      {/* <div className='HomeScreen_BottomBar'>
        <button className='HomeScreen_BottomBar_Messages' onClick={() => {setActiveScreen("List")}} >L</button>
        <button className='HomeScreen_BottomBar_Home' onClick={() => {setActiveScreen("Map")}}>M</button>
        <button className='HomeScreen_BottomBar_List'>Me</button>
      </div> */}
    </div>
  );
}

export default HomeScreen;
