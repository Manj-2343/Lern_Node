const express = require("express");
const connectDb = require("./config/db.js");
const User = require("./models/user.js");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    email: "virat@gmail.com",
    password: "12345",
  };
  // creating the new instance of teh userModel
  const user = new User(userObj);
  await user.save();
  res.send("User added successfully");
});
// __v:0 this is  the version of you document

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
