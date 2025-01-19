import './styles/SplashScreen.css'

function App() {
  let handleLogin = () => {
    console.log("login")
  }

  let handleSignUp = () => {
    console.log("signup")
  }

  return (
    <>
    <div className='SplashScreen'>
      <div className='SplashScreen_Name'>CACHE</div>
      <div className='SplashScreen_Buttons'>
        <button className='SplashScreen_Button SplashScreen_Buttons_Login' onClick={() => handleLogin()} > 
          LOGIN 
        </button>
        <button className='SplashScreen_Button SplashScreen_Buttons_SignUp' onClick={() => handleSignUp()}> 
          SIGNUP 
        </button>
      </div>
    </div>
    </>
  )
}

export default App
