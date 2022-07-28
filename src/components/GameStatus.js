import React from "react";
import BeginBattle from "./BeginBattle";

function GameStatus(props) {
  const renderComponent = () => {
    if (props.gamePhase === "planning" && checkShipsPlaced()) {
      return (
        <BeginBattle
          socket={props.socket}
          room={props.room}
          setGamePhase={props.setGamePhase}
          activeShip={props.activeShip}
          isReady={props.isReady}
          setIsReady={props.setIsReady}
        />
      );
    }
  };

  const checkShipsPlaced = () => {
    const remainingShips = props.ships.filter(
      (ship) => !ship.placed && ship.name !== "dummy"
    );
    if (!remainingShips.length) return true;
  };

  return <aside>{renderComponent()}</aside>;
}

export default GameStatus;
