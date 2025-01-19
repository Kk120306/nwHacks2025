import React, { useState } from "react";
import "./styles/ProfileScreen.css";

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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleRemoveFriend = () => {
    setModalVisible(false); // Close the modal
    console.log(`${selectedFriend.name} has been removed.`);
  };

  const openModal = (name) => {
    setSelectedFriend(name);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedFriend(null);
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
          <img src="src/images/RickRoll.png" />
        </div>
        <div className="userName">
          <h2>Ack Ristley</h2>
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

                <button
                  className="Unfriend Button"
                  onClick={() => openModal(item.name)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Log Out">
        <button
          className="ProfileScreen_Button LogOut"
          onClick={() => handleLogout()}
        >
          LOGOUT
        </button>
      </div>

      <footer>
        <p>&copy; 2025 GeoCaching. No rights reserved.</p>
      </footer>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure?</h2>
            <p>Do you want to unfriend {selectedFriend?.name}?</p>
            <div className="modal-buttons">
              <button onClick={handleRemoveFriend} className="confirm-button">
                Yes
              </button>
              <button onClick={closeModal} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileScreen;

/* <div className="Dark Mode Toggle">
        <button
          className="ProfileScreen_Button DarkMode"
          onClick={() => handleMode()}
        >
          DarkMode
        </button>
      </div> */

// let handleMode = () => {
//   if (darkMode) {
//     console.log("Light Mode is Now On");
//     darkMode = 0;
//   } else {
//     console.log("Dark Mode is Now On");
//     darkMode = 1;
//   }
// };
