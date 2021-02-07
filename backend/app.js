const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => emitStatusMessage(socket), 1000);

  socket.on("disconnect", () => {
    socket.emit("Connection is closed");
    clearInterval(interval);
  });
});

const emitStatusMessage = (socket) => {
  socket.emit("Coonection is active");
};

server.listen(port, () => console.log(`Listening on port ${port}`));
