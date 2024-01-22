const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

app.use("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundUser = users.find((user) => user.id === Number(userId));

  if (foundUser) {
    res.json({ data: foundUser });
  } else {
    next(`User id not found: ${userId}`);
  }
});

app.use("/users", (req, res) => {
  res.json({ data: users });
});

app.use("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;
  const stateName = statesData[stateCode];

  if (stateName) {
    res.json({ data: { stateCode, name: stateName } });
  } else {
    next(`State code not found: ${stateCode}`);
  }
});

app.use("/states", (req, res) => {
  res.json({ data: states });
});

app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});
module.exports = app;
