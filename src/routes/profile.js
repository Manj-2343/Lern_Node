const express = require("express");
const { userAuth } = require("../utils/authMiddleware");
const { validateEditProfileData } = require("../helpers/validation");

const profileRouter = express.Router();

//get the profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    // loggedInUser.firstName = req.body.firstName;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName},Your Profile updated successfully`);
    res.json({
      message: `${loggedInUser.firstName},your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//forget password

module.exports = profileRouter;
