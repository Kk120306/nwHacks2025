import React from "react";

class Person {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
}

function ProfileScreen() {
  let darkMode = 1;

  let handleLogout = () => {
    console.log("logout");
  };

  let handleMode = () => {
    if (darkMode) {
      console.log("Light Mode is Now On");
      darkMode = 0;
    } else {
      console.log("Dark Mode is Now On");
      darkMode = 1;
    }
  };

  let arr = [
    new Person("Friend 1", "https://via.placeholder.com/500x300"),
    new Person("Friend 2", "https://via.placeholder.com/500x300"),
    new Person("Friend 3", "https://via.placeholder.com/500x300"),
  ];

  return (
    <div>
      <header>
        <h1></h1>
      </header>

      <div className="User">
        <div className="Profile Picture">
          <img src="https://via.placeholder.com/500x300" />
        </div>
        <div className="userName">
          <h2>demo user</h2>
          <p></p>
        </div>
      </div>

      <div className="Friends">
        <div className="List of friends">
          <div id="friend List">
            {arr.map((item, index) => (
              <div key={index} className="friend">
                <div className="Profile Picture">
                  <img src={item.image} />
                </div>
                <div className="userName">
                  <h2>{item.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Dark Mode Toggle">
        <button
          className="ProfileScreen_Button LogOut"
          onClick={() => handleLogout()}
        >
          LOGOUT
        </button>
      </div>

      <div className="Log Out">
        <button
          className="ProfileScreen_Button LogOut"
          onClick={() => handleMode()}
        >
          DarkMode
        </button>
      </div>

      <footer>
        <p>&copy; 2025 Vertical Feed. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ProfileScreen;
