import React from 'react'
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className='HomeScreen_BottomBar'>
        <Link to = "/list">
            <button className='HomeScreen_BottomBar_Home'>
                <img src='https://cdn-icons-png.flaticon.com/512/570/570170.png' width={"20px"} height={"20px"} ></img>
            </button>
        </Link>
        <Link to = "/home">
            <img src='https://cdn-icons-png.flaticon.com/512/3082/3082383.png' width={"20px"} height={"20px"}></img>
        </Link>
        <Link to = "/addCache">
            <img src='https://img.icons8.com/m_rounded/512/plus.png' width={"22px"} height={"22px"}></img>
        </Link>
        <Link to = "/profile" >
            <img src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' width={"25px"} height={"25px"}></img>
        </Link>
    </div>
  )
}

export default BottomNav
