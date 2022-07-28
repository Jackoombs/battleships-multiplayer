import { motion } from "framer-motion"

function BattleTile(props) {

  const handleHover = () => {
    if (!props.disableClick){
      props.setCurrentTile({ x: props.x, y: props.y });
    }
  };

  const handleClick = () => {
    if (props.playerTurn && checkTileFree() && !props.disableClick) {
      props.sendFire();
    }
  };

  const checkTileFree = () => {
    return !props.opponentTiles[props.x][props.y] 
  };

  const tileStyle = () => {
    if (props.playerTurn && props.opponentTiles[props.x][props.y]) {
      return props.opponentTiles[props.x][props.y];
    }
    if (!props.playerTurn && props.selectedTiles[props.x][props.y]) {
      return props.selectedTiles[props.x][props.y];
    }
    if (
      props.currentTile.x === props.x &&
      props.currentTile.y === props.y &&
      props.playerTurn
    ) {
      return "bomb";
    }
  };

  

  return (
    <motion.div
      className={`tile ${tileStyle()}`}
      onMouseEnter={handleHover}
      onClick={handleClick}
      animate={props.animatedTile.x === props.x && props.animatedTile.y === props.y ? {borderColor: "#f73b42"} : ''}
      transition={{ duration: 0.45, repeat: 5, ease: "backInOut", repeatType: "reverse"}}
    />
  );
}

export default BattleTile;
