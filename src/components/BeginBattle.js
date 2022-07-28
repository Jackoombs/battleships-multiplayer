import React, { useEffect, useState } from "react";
import WaitModal from "./WaitModal";

function BeginBattle(props) {

  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    props.socket.on("check-ready", emitBattle);
    return () => {
      props.socket.removeAllListeners("check-ready")
    }
    
  },[isReady]);

  const handleClick = () => {
    setIsReady(true);
    props.socket.emit("client-ready", props.room);
  };

  const emitBattle = () => {
    if (isReady) {
      props.socket.emit("start-battle", props.room);
    }
  };

  return (
    <>
      <button className="lobby-btn" id="begin-battle" onClick={handleClick}>
        BEGIN BATTLE
      </button>
      {isReady &&          
        <WaitModal
          setState={setIsReady}
          socket={props.socket}
          listenerEvent={"check-ready"}
        />}
    </> 
  ) 
}

export default BeginBattle;
