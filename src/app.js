const express = require("express");
const connectDb = require("./config/db.js");
const User = require("./models/user.js");
const {
  validateSignUpData,
  validateLoginData,
} = require("./helpers/validation.js");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const { userAuth } = require("./utils/authMiddleware.js");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());
// add the data
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    // Validate the request data
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create the token
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER123");
      console.log(token);

      //add teh token to cookie and send the response back to the user.
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

//get teh profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

//get single data  on the basic the email
// model=find({emailId: userEmail })
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //if you want to find the single user with same mailid
    /** 
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
*/
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
});
//get all the user userData
//model=find({})
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
});
// delete the document
// findByIdAndDelete
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
    // const user = await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
});
//update the method
//findByIdAndUpdate
//Note:behind the seen findOneAndUpdate and findByIdAndUpdate is same .
//any other data except from teh schema will not be updated
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    // if you get teh older data you can use {returnDocument: "before"},if you want new data you can used  {returnDocument: "after"}
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User Undated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("update failed");
  }
});

connectDb()
  .then(() => {
    console.log("Database connection established......");
    app.listen(8080, () => {
      console.log("server is successfully listening on the port 8080!!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//https://www.npmjs.com/package/bcrypt
