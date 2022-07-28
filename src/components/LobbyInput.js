import React, { useState, useEffect } from "react";
import Error from "../assets/error.png";

function LobbyInput(props) {
  const [roomName, setRoomName] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const regex = new RegExp("^[a-zA-Z0-9_-]*$");

  const handleChange = (e) => {
    setRoomName(e.target.value.toString().trim());
  };

  useEffect(() => {
    checkErrors(roomName);
  }, [roomName]);

  const checkErrors = (roomName) => {
    const errors = [];
    if (!regex.test(roomName)) {
      errors.push(
        "The room name may only contain, letters, number and dashes."
      );
    }
    if (!roomName.length) {
      errors.push("This is a required field.");
    }
    if (roomName.length > 20) {
      errors.push("The room name must be less than 20 characters long.");
    }
    setErrors(errors);
  };

  props.socket.on("error", (error) => {
    setErrors([...errors, error]);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.length) {
      props.socket.emit("room-request", roomName, props.playerTurn);
    }
  };

  const handleFocus = () => {
    setShowErrors(true);
  };

  const handleBack = () => {
    props.setPlayerTurn();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="roomInput"
          onChange={handleChange}
          placeholder="ROOM NAME"
          onFocus={handleFocus}
        />
        <label htmlFor="roomInput">Room Name</label>
        {showErrors
          ? errors.map((error, index) => (
              <p key={index}>
                <img src={Error} alt="error cross" />
                {error}
              </p>
            ))
          : ""}
        <span>
          <button className="lobby-btn" type="submit">
            {props.playerTurn ? "Create" : "Join"}
          </button>
          <button className="lobby-btn" type="text" onClick={handleBack}>
            Back
          </button>
        </span>
      </form>
    </>
  );
}

export default LobbyInput;
