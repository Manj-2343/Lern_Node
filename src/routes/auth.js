const express = require("express");
const {
  validateSignUpData,
  validateLoginData,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

//signUp
authRouter.post("/signup", async (req, res) => {
  try {
    //validation to the data
    validateSignUpData(req);
    //encrypt you password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //save the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    console.error(error.message);
    res.status(400).send("error saving the user");
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    // Validate the request data
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Invalid credentials");
  }
});

module.exports = authRouter;
