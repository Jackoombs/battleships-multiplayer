function PlanningPhaseTile(props) {
  const handleHover = () => {
    props.setCurrentTile({ x: props.x, y: props.y });
  };

  const handleWheel = (e) => {
    props.setOrientation((old) => (old === "x" ? "y" : "x"));
  };

  const handleClick = (e) => {
    if (props.validOnHover && props.activeShip.name !== "dummy") {
      addToSelectedTiles();
      props.updateShips(true, props.activeShip.name);
    } else if (
      props.selectedTiles[props.x][props.y] &&
      props.activeShip.name === "dummy"
    ) {
      const clickedShipName = props.selectedTiles[props.x][props.y];
      props.updateShips(false, clickedShipName);
      removeFromSelectedTiles(clickedShipName);
    }
  };

  const addToSelectedTiles = () => {
    const newSelectedTiles = JSON.parse(JSON.stringify(props.selectedTiles));
    // Iterates over the 2d array and adds the hover tiles to the selected state.
    for (let x = 0; x < props.tilesOnHover.length; x++) {
      for (let y = 0; y < props.tilesOnHover[x].length; y++) {
        if (props.tilesOnHover[x][y]) {
          newSelectedTiles[x][y] = props.tilesOnHover[x][y];
        }
      }
    }
    props.setSelectedTiles(newSelectedTiles);
  };

  const removeFromSelectedTiles = (shipName) => {
    const newSelectedTiles = JSON.parse(JSON.stringify(props.selectedTiles));
    for (let x = 0; x < props.tilesOnHover.length; x++) {
      for (let y = 0; y < props.tilesOnHover[x].length; y++) {
        if (newSelectedTiles[x][y] === shipName) {
          newSelectedTiles[x][y] = null;
        }
      }
    }
    props.setSelectedTiles(newSelectedTiles);
  };

  const tileStyle = () => {
    if (
      props.tilesOnHover[props.x][props.y] &&
      !props.validOnHover &&
      props.activeShip.name !== "dummy"
    ) {
      return "taken";
    }
    if (props.selectedTiles[props.x][props.y]) {
      return props.selectedTiles[props.x][props.y];
    }
    if (props.tilesOnHover[props.x][props.y]) {
      return props.activeShip.name + " hover";
    }
  };

  return (
    <div
      className={`tile ${tileStyle()}`}
      onMouseEnter={handleHover}
      onWheel={handleWheel}
      onClick={handleClick}
      onTouchStart={handleHover}
    >
      {props.x}, {props.y}
    </div>
  );
}

export default PlanningPhaseTile;
