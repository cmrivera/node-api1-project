//import db
const db = require("./database.js");
const express = require("express");

//creates a new express server
const server = express();

//install middleware to help parse JSON requests
server.use(express.json());

//require(req), response(res)
server.get("/", (req, res) => {
  res.json({ message: "Getting server" });
});

server.get("/users", (req, res) => {
  //get list of users from fake database
  const users = db.getUsers();
  res.send({ message: "I am running on port 8080" });
  //send data back, finalize
  res.json(users);
});

server.get("/users/:id", (req, res) => {
  //set param variable to match up to name of URL param above
  const id = req.params.id;

  //get specific user by id from fake DB
  const user = db.getUserById(id);

  //make sure system does not break if someone calls endpoint
  //a user ID that does not exist in DB
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ errmessage: " User not found" });
  }
});

server.post("/users", (req, res) => {
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.name,
  });
  //res.status(201).json(newUser);
  if (!newUser) {
    res.status(400).json({
      errMessage: "newUser missing information cant create, need name and bio",
    });
  } else {
    res.status(201).json(newUser, { message: " User created" });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(req.params.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "User not found, user does not exist",
    });
  }
});

server.put("/users/:id", (req, res) => {
  if (user) {
    db.updateUser(req.params.id);
    res.status(204).json({ message: "User update" });
  } else {
    res.status(404).json({ errMessage: "user not found" });
  }
});
server.listen(8080, () => {
  console.log("Server started on port 8080");
});
