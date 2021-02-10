const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const neuro = require("neuro.js");

require("dotenv").config();

const index = require("./routes/index");

const app = express();
app.use(cors("*"));

app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  socket.emit("message", "Connection is active");

  socket.on("message", (msg) => {
    socket.emit("message", `ChatBot- ${msg}`);
  });

  socket.on("disconnect", () => {
    socket.emit("Connection is closed");
    clearInterval(interval);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
