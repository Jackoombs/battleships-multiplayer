import { useEffect, useRef, useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import Result from "./components/Result";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080/");

function App() {
  const [playerTurn, setPlayerTurn] = useState();
  const [isWinner, setIsWinner] = useState(false)
  const [room, setRoom] = useState();
  const [gamePhase, setGamePhase] = useState("lobby");

  const finalPlayerTurn = useRef(playerTurn)

  useEffect(() => {
    finalPlayerTurn.current = playerTurn
  },[playerTurn])

  useEffect(() => {
    socket.on("valid-room", (room) => {
      setRoom(room);
    });
  
    socket.on("start-game", () => {
      setGamePhase("planning");
    });
  
    socket.on("battle-begin", () => {
      setGamePhase("battle");
    });
  
    socket.on("receive-winner", () => {
      setGamePhase("result")
      console.log(finalPlayerTurn)
      if (finalPlayerTurn.current) setIsWinner(true)
    })
  },[])

  return (
    <div className="App">
      <h1>Battleships</h1>

      {gamePhase === "lobby" &&
        <Lobby
          socket={socket}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
          room={room}
          setRoom={setRoom}
        />}
      {(gamePhase === "planning" || gamePhase === "battle") && 
        <Game
          gamePhase={gamePhase}
          setGamePhase={setGamePhase}
          socket={socket}
          room={room}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
        />}
      {gamePhase === "result" &&
        <Result 
          isWinner={isWinner}
        />}
    </div>
  );
}

export default App;
