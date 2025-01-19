import React from 'react'
import ReactDOM from 'react-dom/client'
import SplashScreen from './components/SplashScreen.jsx'
import './index.css'
import HomeScreen from './components/HomeScreen.tsx'
import Login from './components/Login.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Signup from './components/Signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      {/* <SplashScreen /> /}
      {/ <Login /> */}
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/home' element = {<HomeScreen activeScreen = "Map"/>} />
        <Route path='/list' element = {<HomeScreen activeScreen = "List"/>} />
        <Route path='/addCache' element = {<HomeScreen activeScreen = "Add"/>} />
        <Route path='/messages' element = {<HomeScreen activeScreen = "List"/>} />
        <Route path='/profile' element = {<HomeScreen activeScreen = "Profile"/>} />
      </Routes>
    </Router>
  </>,
)