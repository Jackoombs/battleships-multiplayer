import React from "react";
import ShipPanel from "./ShipPanel";

function ShipStatus(props) {
  return (
    <aside className="ship-status">
      <ShipPanel ships={props.ships} text="Your ships"/>
      <ShipPanel ships={props.opponentShips} text="Opponents ships"/>
    </aside>
  )
}

export default ShipStatus