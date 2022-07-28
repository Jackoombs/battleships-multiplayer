function BattleUpdate(props) {

  const battleUpdateMsg = () => {
    if (props.playerTurn) {
      if (props.roundStatus === "miss") return "You missed!"
      else if (props.roundStatus === "hit") return "You hit one of their ships!"
      else if (props.roundStatus === "deciding") return "Where do you want to fire?"
      else return `You sunk their ${props.roundStatus}!`
    } else {
      if (props.roundStatus === "miss") return "They missed!"
      else if (props.roundStatus === "hit") return "They hit one of you ships!"
      else if (props.roundStatus === "deciding") return "Your opponent is deciding where to fire!"
      else return `They sunk your ${props.roundStatus}!`
    }
  }

  return (
    <div>
      <h2>{props.playerTurn ? "Your Turn" : "Opponents Turn"}</h2>
      <p>{battleUpdateMsg()}</p>
    </div>
  )
}

export default BattleUpdate