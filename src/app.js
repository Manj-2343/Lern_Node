const express = require("express");

const app = express(); //this indicate the express js application

//syntax:app.use("/route",[rh1,rh2,rh3]) or app.use("/route",[rh1,rh2],rh3) or app.use("/route",rh1,rh2)
app.use("/user", [
  (req, res, next) => {
    console.log("this is 1st response");
    next(); //to handle the multiple  route handler
  },
  (req, res) => {
    console.log("this is second response");
    res.send("route handler two ");
  },
]); //the call back function is known as the route handler

app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});
