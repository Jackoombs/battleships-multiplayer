import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import WaitModal from "./WaitModal"

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

function Result(props) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  useEffect(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const ResultMessage = () => {
    return (
      props.isWinner
        ? "Congrats you're the WINNER!"
        : "Commiserations, you lost."
    )
  }

  const [playAgain, setPlayAgain] = useState(false)
  const handleClick = () => {
    setPlayAgain(true)
    props.socket.emit("send-play-again", props.room)
  }

  useEffect(() => {
    props.socket.on("check-play-again", emitRestart)

    return () => {
      props.socket.removeAllListeners("check-play-again")
    }
  },[playAgain])

  const emitRestart = () => {
    if (playAgain) {
      props.socket.emit("send-restart-game", props.room)
    }
  }

  return (
    <main>
      <h2>{ResultMessage()}</h2>
      {props.isWinner && <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />} 

      <button 
        className="lobby-btn"
        onClick={handleClick}>
        Play Again?
      </button>
      {playAgain && 
        <WaitModal 
          setState={setPlayAgain}
          listenerEvent="check-play-again"
          socket={props.socket}
        />}
    </main>
  )
}

export default Result