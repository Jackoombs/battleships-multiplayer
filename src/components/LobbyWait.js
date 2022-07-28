import React from "react";
import { Puff } from "react-loading-icons";

function LobbyWait(props) {
  const handleClick = () => {
    props.setPlayerTurn();
    props.setRoom();
    props.socket.emit("leave-room", props.room);
  };

  return (
    <div className="lobby-wait">
      <h2>
        Waiting for opponent in room: <br />
        <strong>{props.room}</strong>
      </h2>
      <Puff height="10rem" width="10rem" />
      <button className="lobby-btn" onClick={handleClick}>
        EXIT
      </button>
    </div>
  );
}

export default LobbyWait;
