import React from 'react';

function ProfileScreen() {
  let handleLogout = () => {
    console.log("logout")
  }

  return (
    <div>
      <header>
        <h1></h1>
      </header>

      <div className="User">
        <div className="Profile Picture">
          <img src="https://via.placeholder.com/500x300"/>
        </div>
        <div className="userName">
            <h2>demo user</h2>
            <p></p>          
        </div>        
      </div>

      <div className="Friends">
        <div className="List of friends">
          
        </div>
      </div>

      <div className="Dark Mode Toggle">
      </div>

      <div className="Log Out">
        <button className='SplashScreen_Button SplashScreen_Buttons_Login' onClick={() => handleLogout()} > 
          LOGOUT 
        </button>
      </div>
      

      <footer>
        <p>&copy; 2025 Vertical Feed. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ProfileScreen;