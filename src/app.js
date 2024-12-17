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
    console.error(error);
    res.status(400).send("error saving the user");
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
