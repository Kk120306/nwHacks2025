import React from 'react'
import ReactDOM from 'react-dom/client'
import SplashScreen from './components/SplashScreen.jsx'
import './index.css'
import HomeScreen from './components/HomeScreen.tsx'
import Login from './components/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <SplashScreen /> */}
    <HomeScreen />
    <Login />
  </React.StrictMode>,
)