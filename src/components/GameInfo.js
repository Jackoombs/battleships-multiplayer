import React from "react";
import PlanningPhaseInfo from "./PlanningPhaseInfo";
import BattleUpdate from "./BattleUpdate";

function GameInfo(props) {

  return (
    <aside className="info">
      {props.gamePhase === "planning" && <PlanningPhaseInfo />}
      {props.gamePhase === "battle" && 
        <BattleUpdate 
          playerTurn={props.playerTurn}
          roundStatus={props.roundStatus}
        /> 
      }
    </aside>
  );
}

export default GameInfo;
