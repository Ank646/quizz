import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button, Typography, Box } from "@mui/material";

const socket = io("http://localhost:5000");

export default function Multiplayer() {
  const [players, setPlayers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    socket.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
    });

    return () => socket.disconnect();
  }, []);

  const handleJoinGame = () => {
    socket.emit("joinGame", { playerName: `User${Math.floor(Math.random() * 1000)}` });
  };

  const handleStartGame = () => {
    setIsStarted(true);
    socket.emit("startGame");
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5">Multiplayer Quiz Room</Typography>
      <Button variant="contained" onClick={handleJoinGame} sx={{ mt: 2 }}>
        Join Game
      </Button>
      {players.length > 1 && !isStarted && (
        <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleStartGame}>
          Start Quiz
        </Button>
      )}
      <Typography variant="h6" sx={{ mt: 2 }}>Players:</Typography>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.playerName}</li>
        ))}
      </ul>
    </Box>
  );
}
