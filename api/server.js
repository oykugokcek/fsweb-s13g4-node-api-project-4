const express = require("express");
const server = express();
const usersRouter = require("../api/users/users-router");
const { logger } = require("./users/users-middleware");
server.use(express.json());

server.use("/api/users", usersRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.send("Başlıyruuuz");
});

module.exports = server;
