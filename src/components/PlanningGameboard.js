import React, { useState, useEffect } from "react";
import PlanningPhaseTile from "./PlanningPhaseTile";
import shipTiles from "../utils/shipTiles";
import RotateButton from "./RotateButton";

function PlanningGameboard(props) {
  const [orientation, setOrientation] = useState("x");
  const [currentTile, setCurrentTile] = useState();
  const [tilesOnHover, setTilesOnHover] = useState(props.twoDimensionalArray());
  const [validOnHover, setValidOnHover] = useState(true);

  useEffect(() => {
    getShipTiles();
  }, [currentTile, orientation]);

  useEffect(() => {
    setValidOnHover(checkValidOnHover());
  }, [tilesOnHover]);

  useEffect(() => {
    setTilesOnHover(props.twoDimensionalArray());
  },[props.activeShip])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown )
  },[])

  const handleMouseLeave = () => {
    setTilesOnHover(props.twoDimensionalArray());
  };

  const handleTouchMove = (e) => {
    const xCoord = e.targetTouches[0].clientX;
    const yCoord = e.targetTouches[0].clientY;
    const elements = document.elementsFromPoint(xCoord, yCoord);
    if (elements[0].classList.contains("tile")) {
      setCurrentTile({ x: +elements[0].getAttribute("x"), y: +elements[0].getAttribute("y") });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      setOrientation((old) => (old === "x" ? "y" : "x"))
    }
  }

  const getShipTiles = () => {
    const newTilesOnHover = props.twoDimensionalArray();

    if (currentTile) {
      const tiles = shipTiles(
        currentTile[orientation],
        props.activeShip.length
      );
      if (orientation === "x") {
        for (const tile of tiles) {
          newTilesOnHover[tile][currentTile.y] = props.activeShip.name;
        }
      } else {
        for (const tile of tiles) {
          newTilesOnHover[currentTile.x][tile] = props.activeShip.name;
        }
      }
    }
    setTilesOnHover(newTilesOnHover);
  };

  const checkValidOnHover = () => {
    for (let x = 0; x < props.selectedTiles.length; x++) {
      for (let y = 0; y < props.selectedTiles[x].length; y++) {
        if (props.selectedTiles[x][y] && tilesOnHover[x][y]) return false;
      }
    }
    return true;
  };

  return (
    <main>
      <div
        id="gameboard"
        onMouseOut={handleMouseLeave}
        onTouchMove={handleTouchMove}
        tabIndex="0"
      >
        {[...Array(10)].map((e, i) =>
          [...Array(10)].map((e2, i2) => (
            <PlanningPhaseTile
              key={`${i} ${i2}`}
              x={i2}
              y={i}
              orientation={orientation}
              setOrientation={setOrientation}
              tilesOnHover={tilesOnHover}
              setTilesOnHover={setTilesOnHover}
              currentTile={currentTile}
              setCurrentTile={setCurrentTile}
              ships={props.ships}
              activeShip={props.activeShip}
              updateShips={props.updateShips}
              selectedTiles={props.selectedTiles}
              setSelectedTiles={props.setSelectedTiles}
              validOnHover={validOnHover}
            />
          ))
        )}
      </div>
      <div>
        <RotateButton 
          orientation={orientation}
          setOrientation={setOrientation}
        />
      </div>
    </main>
  );
}

export default PlanningGameboard;
