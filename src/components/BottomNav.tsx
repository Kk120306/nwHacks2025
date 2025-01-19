import React from 'react'
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className='HomeScreen_BottomBar'>
        <Link to = "/list">
            <button className='HomeScreen_BottomBar_Home'>L</button>
        </Link>
        <Link to = "/home">
            <button className='HomeScreen_BottomBar_Messages'>M</button>
        </Link>
        <Link to = "/addCache">
            <button className='HomeScreen_BottomBar_List'>A</button>
        </Link>
        <Link to = "/messages" >
            <button className='HomeScreen_BottomBar_List'>Me</button>
        </Link>
        <Link to = "/profile" >
            <button className='HomeScreen_BottomBar_List'>P</button>
        </Link>
    </div>
  )
}

export default BottomNav
