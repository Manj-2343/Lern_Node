const express = require("express");

const app = express(); //this indicate the express js application

app.get("/user/:userId", (req, res) => {
  console.log(req.query); //to get the query param
  console.log(req.params); //to get the parama;
  res.send({ firstName: "Manoj", lastName: "Biswal" });
});
app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});

//order of the route is matters
// htpp method: get post put delete
