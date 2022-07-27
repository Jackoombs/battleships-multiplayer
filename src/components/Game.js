import React, { useState, useEffect } from "react";
import PlanningGameboard from "./PlanningGameboard";
import GameInfo from "./GameInfo";
import GameStatus from "./GameStatus";
import BattleGameboard from "./BattleGameboard";
import ShipStatus from "./ShipStatus";

function Game(props) {
  const ship = (name, length, position) => {
    return { name, length, sunk: false };
  };

  const twoDimensionalArray = () => {
    return Array(10)
      .fill(0)
      .map(() => Array(10));
  };

  const [roundStatus, setRoundStatus] = useState("deciding")
  const [isReady, setIsReady] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState(twoDimensionalArray());
  const [ships, setShips] = useState([
    ship("carrier", 5),
    ship("battleship", 4),
    ship("destroyer", 3),
    ship("submarine", 3),
    ship("patrol-boat", 2),
    ship("dummy", 1),
  ]);
  const [opponentShips, setOpponentShips] = useState([
    ship("carrier", 5),
    ship("battleship", 4),
    ship("destroyer", 3),
    ship("submarine", 3),
    ship("patrol-boat", 2),
    ship("dummy", 1),
  ]);
  const [activeShip, setActiveShip] = useState(ships[0]);

  useEffect(() => {
    setNewActiveShip();
  }, [ships]);

  const updateShips = (isPlaced, shipName) => {
    const newShips = ships.map((ship) => {
      if (ship.name === shipName) {
        ship.placed = isPlaced;
      }
      return ship;
    });
    setShips(newShips);
  };

  const setNewActiveShip = () => {
    const shipsNotPlaced = ships.filter((ship) => !ship.placed);
    if (shipsNotPlaced.length) {
      setActiveShip(shipsNotPlaced[0]);
    }
  };

  useEffect(() => {
    console.log(selectedTiles)
  },[selectedTiles])
  

  return (
    <section className="game">
      <GameInfo 
        gamePhase={props.gamePhase} 
        playerTurn={props.playerTurn}
        roundStatus={roundStatus}
      />
      {props.gamePhase === "planning" ? (
        <PlanningGameboard
          ships={ships}
          activeShip={activeShip}
          updateShips={updateShips}
          selectedTiles={selectedTiles}
          setSelectedTiles={setSelectedTiles}
          twoDimensionalArray={twoDimensionalArray}
        />
      ) : (
        <>
          <BattleGameboard
            playerTurn={props.playerTurn}
            setPlayerTurn={props.setPlayerTurn}
            ships={ships}
            setShips={setShips}
            opponentShips={opponentShips}
            setOpponentShips={setOpponentShips}
            setGamePhase={props.setGamePhase}
            selectedTiles={selectedTiles}
            setSelectedTiles={setSelectedTiles}
            twoDimensionalArray={twoDimensionalArray}
            socket={props.socket}
            room={props.room}
            setRoundStatus={setRoundStatus}
          />
          <ShipStatus 
            ships={ships}
            opponentShips={opponentShips}
          />
        </>
      )}

      <GameStatus
        isReady={isReady}
        setIsReady={setIsReady}
        activeShip={activeShip}
        gamePhase={props.gamePhase}
        setGamePhase={props.setGamePhase}
        ships={ships}
        socket={props.socket}
        room={props.room}
      />
    </section>
  );
}

export default Game;
