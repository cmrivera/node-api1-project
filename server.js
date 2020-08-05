//import db
const db = require("./dataBase.js");
const express = require("express");

//creates a new express server
const server = express();

//install middleware to help parse JSON requests
server.use(express.json());

//require(req), response(res)
server.get("/", (req, res) => {
  res.json({ message: "Getting server" });
});

server.get("/api/users", (req, res) => {
  //get list of users from fake database
  const users = db.getUsers();
  //send data back, finalize
  res.json(users);
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});
