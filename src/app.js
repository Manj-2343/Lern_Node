const express = require("express");

const app = express();

//another way to handle route handler
app.use("/user", (req, res, next) => {
  console.log("this is 1st response");
  next();
});
app.use("/user", (req, res, next) => {
  console.log("this is 1st response");
  res.send("this is from second");
  // next();
});
//note if you have double next after that you do not have any route handler then it under  goes error but if you have not the
// the res.send in the  last route handler it give  the infinite request.
//this next function is called the middleware.
app.listen(8080, () => {
  console.log("server is successfully listening on the port 8080!!!");
});
