const express = require("express");

const app = express(); //this indicate the express js application

//
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Manoj", LastName: "Biswal" });
// });
// below b is optional
// app.get("/ab?c", (req, res) => {
//   res.send({ firstName: "Manoj", LastName: "Biswal" });
// });
// below you can add the extra b this get mode called with out any error
// app.get("/ab+c", (req, res) => {
//   res.send({ firstName: "Manoj", LastName: "Biswal" });
// });
// below you can add any thing after the * burt here you must start with ab
// app.get("/ab*c", (req, res) => {
//   res.send({ firstName: "Manoj", LastName: "Biswal" });
// });
// below the bc are optional
app.get("/a(bc)?d", (req, res) => {
  res.send({ firstName: "Manoj", LastName: "Biswal" });
});
app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});

//order of the route is matters
// htpp method: get post put delete
