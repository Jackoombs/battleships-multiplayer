import { useEffect, useRef, useState } from "react";
import BattleTile from "./BattleTile";

function BattleGameboard(props) {

  const [disableClick, setDisableClick] = useState(false)
  let playerTurn = useRef(props.playerTurn)

  useEffect(() => {
    if (disableClick) {
      setTimeout(() => {
        props.setPlayerTurn(turn => !turn)
        setDisableClick(false)
        props.setRoundStatus("deciding")
      },500)
    }
  },[disableClick])

  useEffect(() => {
    playerTurn.current = props.playerTurn
  },[props.playerTurn])

  useEffect(() => {
    props.socket.on("receive-fire", tile => {
      let isSunk = false
      const isHit = checkHit(tile)
      if (isHit === "hit") {
        isSunk = checkSunk(tile)
      }
      props.socket.emit("send-turn-result", props.room, tile, isHit, isSunk)
    })

    props.socket.on("receive-turn-result", (tile, isHit, isSunk) => {
      updateHitMiss(tile, isHit)
      updateSunk(isSunk)
      if (isSunk) {
        props.setRoundStatus(isSunk)
      } else {
        props.setRoundStatus(isHit)
      }
      setDisableClick(true)
    })
  },[])

  const [opponentTiles, setOpponentTiles] = useState(
    props.twoDimensionalArray()
  );
  const [currentTile, setCurrentTile] = useState({});

  const sendFire = () => {
    props.socket.emit("send-fire", props.room, currentTile);
  };

  const checkHit = (tile) => {
    const isHit = props.selectedTiles[tile.x][tile.y]
    return isHit ? "hit" : "miss"
  }

  const checkSunk = (tile) => {
    const hitShip = props.selectedTiles[tile.x][tile.y]
    const shipTilesRemaining = [].concat(...props.selectedTiles).filter(e => e === hitShip)
    console.log(shipTilesRemaining.length)
    return shipTilesRemaining.length === 1 ? hitShip : false
  }

  const updateHitMiss = (tile, isHit) => {
    playerTurn.current
      ? opponentTiles[tile.x][tile.y] = isHit
      : props.selectedTiles[tile.x][tile.y] = isHit
  }

  const updateSunk = (isSunk) => {
    console.log(isSunk)
    if (isSunk && playerTurn.current) {
      const newShips = props.opponentShips.map(ship => {
        if (ship.name === isSunk) {
          ship.sunk = true
        }
        return ship
      })
      props.setOpponentShips(newShips)
      checkWin()
    } else if (isSunk) {
      const newShips = props.ships.map(ship => {
        if (ship.name === isSunk) {
          ship.sunk = true
        }
        return ship
      })
      props.setShips(newShips)
    }
  }

  const checkWin = () => {
    const remainingShips = props.opponentShips.filter(ship => !ship.sunk )
    console.log("winner")
    if (remainingShips.length === 1) {
      
      props.socket.emit("send-winner", props.room)
    }
  }

  return (
    <main>
      <div id="gameboard">
        {[...Array(10)].map((e, i) =>
          [...Array(10)].map((e2, i2) => (
            <BattleTile
              key={`${i} ${i2}`}
              x={i2}
              y={i}
              playerTurn={props.playerTurn}
              currentTile={currentTile}
              setCurrentTile={setCurrentTile}
              ships={props.ships}
              activeShip={props.activeShip}
              selectedTiles={props.selectedTiles}
              setSelectedTiles={props.setSelectedTiles}
              opponentTiles={opponentTiles}
              sendFire={sendFire}
              disableClick={disableClick}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default BattleGameboard;
