import Ship from "./Ship"

function ShipPanel(props) {
  return (
    <div className="ship-panel">
      <h2>{props.text}</h2>
      <div className="ships">
        {props.ships.map((ship, i) => (
          !ship.sunk
            ? <Ship 
                key={i}
                ship={ship}
                tileScale={0.6}
              />
            : ''
        ))}
      </div>
    </div>
  )
}

export default ShipPanel