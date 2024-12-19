const express = require("express");
const { userAuth } = require("../utils/authMiddleware");

const requestRouter = express.Router();
requestRouter.post("/sendingTheConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    console.log(user.firstName + "Sending the connection request");
    res.send("Sending the connection");
  } catch (error) {
    console.log(error);
  }
});

module.exports = requestRouter;
