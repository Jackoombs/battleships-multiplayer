import React, { useEffect, useState } from "react";
import PlanningWait from "./PlanningWait";

function BeginBattle(props) {
  
  useEffect(() => {
    props.socket.on("check-ready", emitBattle);
  });

  const handleClick = () => {
    props.setIsReady(true);
    props.socket.emit("client-ready", props.room);
  };

  const emitBattle = () => {
    if (props.isReady) {
      props.socket.emit("start-battle", props.room);
    }
  };

  const renderComponent = () => {
    if (!props.isReady) {
      return (
        <button className="lobby-btn" id="begin-battle" onClick={handleClick}>
          BEGIN BATTLE
        </button>
      );
    } else {
      return (
        <PlanningWait
          setIsReady={props.setIsReady}
          socket={props.socket}
          emitBattle={emitBattle}
        />
      );
    }
  };

  return <>{renderComponent()}</>;
}

export default BeginBattle;
