const express = require("express");
const { adminAuth, userAuth } = require("./utils/authMiddleware.js");

const app = express();

app.use("/admin", adminAuth);
app.get("/user", userAuth, (req, res) => {
  res.send("UserData send");
});
//Get/users =>middlewares chain => request handlers
app.get("/admin/getAllData", (req, res) => {
  res.send("get all the data");
});
app.delete("/admin/deleteData", (req, res) => {
  res.send("Delete the data");
});

app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});
