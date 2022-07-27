import { FcRotateToLandscape, FcRotateToPortrait } from "react-icons/fc"

function RotateButton(props) {

  const handleClick = () => {
    props.setOrientation( 
      orientation => orientation === "x" ? "y" : "x"
    )
  }

  return (
    <button className="rotate-btn" onClick={handleClick}>
      {props.orientation === "x" 
        ? <FcRotateToLandscape size="5rem"/>
        : <FcRotateToPortrait size="5rem"/>}
    </button>
  )
}

export default RotateButton