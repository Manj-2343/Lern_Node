const express = require("express");
const connectDb = require("./config/db.js");
const User = require("./models/user.js");

const app = express();

app.use(express.json());
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
