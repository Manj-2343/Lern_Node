const express = require("express");
const { userAuth } = require("../utils/authMiddleware");

const profileRouter = express.Router();

//get the profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = profileRouter;
