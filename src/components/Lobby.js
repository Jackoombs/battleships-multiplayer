import React from "react";
import LobbyCreateJoin from "./LobbyCreateJoin";
import LobbyInput from "./LobbyInput";
import LobbyWait from "./LobbyWait";

function Lobby(props) {
  const renderLobbyComponent = () => {
    if (props.playerTurn === undefined) {
      return <LobbyCreateJoin setPlayerTurn={props.setPlayerTurn} />;
    }
    if (props.room === undefined) {
      return (
        <LobbyInput
          socket={props.socket}
          setPlayerTurn={props.setPlayerTurn}
          playerTurn={props.playerTurn}
        />
      );
    } else {
      return (
        <LobbyWait
          socket={props.socket}
          room={props.room}
          setRoom={props.setRoom}
          setPlayerTurn={props.setPlayerTurn}
        />
      );
    }
  };

  return <main className="lobby">{renderLobbyComponent()}</main>;
}

export default Lobby;
