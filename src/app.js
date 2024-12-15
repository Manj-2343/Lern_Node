const express = require("express");

const app = express(); //this indicate the express js application

app.use("/test", (req, res) => {
  res.send("Hello i am from the test server...");
});
app.use("/hello", (req, res) => {
  res.send("Hello i am from the  hello server...");
});
app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});
