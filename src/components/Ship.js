import React from "react";

function Ship(props) {

  const shipStyles = {
    height: `calc(var(--tile-size)*${props.tileScale})`,
    width: `calc(var(--tile-size)*${props.ship.length}*${props.tileScale})`
  }

  return (
    <div class={props.ship.name} style={shipStyles}>
    </div>
  )
}

export default Ship