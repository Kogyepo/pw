const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const config = require('./config');
const socketIo = require("socket.io");

const hostname = "0.0.0.0";
const port = Number(process.env.PORT || 5000);

let router = require('./router');
var app = express();

mongoose.connect(config.db)
  .then(() => console.log('Connection successful!'))
  .catch((err) => console.error(err));

const server = http.Server(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.NODE_ENV !== "production"
    ? process.env.LOCAL_FRONTEND_URL
    : null
].filter(Boolean);

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Socket, new connection", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use(router.init(io));

app.use('/images', express.static(path.join(__dirname, 'images')));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});