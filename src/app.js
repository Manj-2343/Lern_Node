const express = require("express");
const connectDb = require("./config/db.js");
const User = require("./models/user.js");

const app = express();

app.use(express.json());
// add the data
app.post("/signup", async (req, res) => {
  // creating the new instance of teh userModel
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("error saving the user");
  }
});
//get single data  on the basic the email
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
    console.log(error);
    res.status(400).send("something went wrong");
  }
});
//get all the user userData
//model=find
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
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
