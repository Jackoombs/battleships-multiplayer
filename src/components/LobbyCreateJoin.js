import React from "react";

function LobbyCreateJoin(props) {
  return (
    <>
      <button className="lobby-btn" onClick={() => props.setPlayerTurn(false)}>
        Join Game
      </button>
      <button className="lobby-btn" onClick={() => props.setPlayerTurn(true)}>
        Create Game
      </button>
    </>
  );
}

export default LobbyCreateJoin;
