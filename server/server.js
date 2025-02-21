const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let players = [];
app.use(cors({ origin: "*" }));  
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on("joinGame", (player) => {
    if (!players.find((p) => p.id === player.id)) {
      players.push({ id: player.id, name: player.name, socketId: socket.id });
      io.emit("updatePlayers", players);
    }
  });

  socket.on("startGame", () => {
    io.emit("gameStarted");
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.socketId !== socket.id);
    io.emit("updatePlayers", players);
    console.log(`Player disconnected: ${socket.id}`);
  });
});

app.post("/explain", async (req, res) => {
  try {
    const { question, correctAnswer } = req.body;

    if (!question || !correctAnswer) {
      return res.status(400).json({ error: "Missing question or correctAnswer" });
    }

    const apiKey = process.env.apiKey;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateText?key=${apiKey}`;

    const requestData = {
      prompt: { text: `Explain why the answer to "${question}" is "${correctAnswer}" in simple terms.` }
    };

    const response = await axios.post(url, requestData);
    res.json({ explanation: response.data.candidates[0].output });

    console.log("Explanation generated:", response.data.candidates[0].output);
  } catch (error) {
    console.error("Error fetching explanation:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

server.listen(5000, () => console.log("Server running on port 5000"));
