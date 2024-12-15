const express = require("express");

const app = express(); //this indicate the express js application

/**
 * if you add this on ist line it will execute only this  
 * app.use("/user", (req, res) => {
  res.send("this is from user");
}); */

//this will only handle get calls to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Manoj", lastName: "Biswal" });
});
app.post("/user", (req, res) => {
  //   console.log("save the data to the data base");
  res.send("save the data to the data base");
});
app.delete("/user", (req, res) => {
  res.send("delete the data from the data base");
});
//this will only match all the http method Api calls to /test
app.use("/test", (req, res) => {
  res.send("Hello i am from the test server...");
});
app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});

//order of the route is matters
// htpp method: get post put delete
